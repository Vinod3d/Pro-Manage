import Task from '../models/taskSchema.js'
import CustomErrorHandler from '../services/CustomErrorHandler.js';

export const createTask = async(req, res, next)=>{
    const { taskTitle, priorityLevel, assignedTo, checklistItems, dueDate, creator } = req.body;

    if (!taskTitle || !priorityLevel) {
        return next(CustomErrorHandler.badRequest("Task title and priority level are required."));
    }

    const formattedChecklistItems = (checklistItems || []).map(item => ({
        text: item.text,
        isCompleted: item.isCompleted || false
    }));

    try {
        const newTask = new Task({
            taskTitle,
            priorityLevel,
            assignedTo: assignedTo || null,
            checklistItems: formattedChecklistItems,
            dueDate: dueDate ? new Date(dueDate) : null,
            creator: req.user._id, 
        });

        const savedTask = await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: savedTask });
    } catch (error) {
        next(error)
    }
}


export const getTaskByCreatorId = async (req, res, next) =>{
    try {
        const creatorId = req.user._id;
        const filter = req.query.filter;
        const userEmail = req.user.email;


        const now = new Date();
        let startDate = new Date(0);
        let endDate = now;

        if(filter === 'today'){
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        } 

        else if (filter === 'thisWeek') {
            const firstDayOfWeek = new Date(now);
            firstDayOfWeek.setDate(now.getDate() - now.getDay() + 1); // Set to Monday
            startDate = firstDayOfWeek;
        }

        else if (filter === 'thisMonth') {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        }

        const userTasks = await Task.find({
            creator: creatorId,
            createdAt: { $gte: startDate, $lt: endDate }
        });

        const emailTasks = await Task.find({
            assignedTo: userEmail,
            createdAt: { $gte: startDate, $lt: endDate }
        });
        const uniqueTasks = new Set([...userTasks, ...emailTasks].map(task => task._id.toString()));
        const combinedTasks = await Task.find({
            _id: { $in: Array.from(uniqueTasks) }
        });

        res.status(200).json({
            message: 'Tasks retrieved successfully',
            tasks: combinedTasks
            
        });
    } catch (error) {
        next(error)
    }
}


export const updateTask = async (req, res, next) => {
    const { taskId } = req.params;
    const { taskTitle, priorityLevel, assignedTo, checklistItems, dueDate, taskStatus } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                taskTitle,
                priorityLevel,
                assignedTo: assignedTo || null,
                checklistItems: checklistItems ? checklistItems.map(item => ({
                    text: item.text,
                    isCompleted: item.isCompleted || false
                })) : undefined,
                dueDate: dueDate ? new Date(dueDate) : null,
                taskStatus
            },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return next(CustomErrorHandler.notFound("Task not found."));
        }

        res.status(200).json({
            message: 'Task updated successfully',
            task: updatedTask
        });
    } catch (error) {
        next(error);
    }
};


export const deleteTask = async (req, res, next) => {
    const { id } = req.params;

    try {
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return next(CustomErrorHandler.notFound('Task not found.'));
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const analyticsdata = async (req, res) => {
    try {
        const userId = req.user._id;
        const userEmail = req.user.email;
        
        const analytics = await Task.aggregate([
            {
                $match: {
                    $or: [
                        { creator: userId },
                        { assignedTo: userEmail }
                    ]
                }
            },
            {
                $group: {
                    _id: null,
                    backlog: { $sum: { $cond: [{ $eq: ['$taskStatus', 'BACKLOG'] }, 1, 0] } },
                    todo: { $sum: { $cond: [{ $eq: ['$taskStatus', 'TO_DO'] }, 1, 0] } },
                    inProgress: { $sum: { $cond: [{ $eq: ['$taskStatus', 'IN_PROGRESS'] }, 1, 0] } },
                    done: { $sum: { $cond: [{ $eq: ['$taskStatus', 'COMPLETED'] }, 1, 0] } },
                    lowPriority: { $sum: { $cond: [{ $eq: ['$priorityLevel', 'LOW'] }, 1, 0] } },
                    moderatePriority: { $sum: { $cond: [{ $eq: ['$priorityLevel', 'MEDIUM'] }, 1, 0] } },
                    highPriority: { $sum: { $cond: [{ $eq: ['$priorityLevel', 'HIGH'] }, 1, 0] } },
                    dueDateTasks: { $sum: { $cond: [{ $ne: ['$dueDate', null] }, 1, 0] } }
                }
            }
        ]);

        const finalAnalytics = analytics.length > 0 ? analytics[0] : {
            backlog: 0,
            todo: 0,
            inProgress: 0,
            done: 0,
            lowPriority: 0,
            moderatePriority: 0,
            highPriority: 0,
            dueDateTasks: 0,
        };

        res.json(finalAnalytics);
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

