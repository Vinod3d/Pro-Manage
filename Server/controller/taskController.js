import Task from '../models/taskSchema.js'
import CustomErrorHandler from '../services/CustomErrorHandler.js';

export const createTask = async(req, res, next)=>{
    const { taskTitle, priorityLevel, assignedTo, checklistItems, dueDate } = req.body;

    if (!taskTitle) {
        return next(CustomErrorHandler.badRequest("Task title are required."));
    }

    if (!checklistItems || checklistItems.length === 0 || !checklistItems.some(item => item.text.trim() !== "")) {
        return next(CustomErrorHandler.badRequest("Add at least one checklist with text"));
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
            firstDayOfWeek.setDate(now.getDate() - (now.getDay() + 1));
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

export const getTaskById = async (req, res, next) => {
    try {
        const { Id } = req.params;
        const task = await Task.findById(Id);

        if (!task) {
            return next(CustomErrorHandler.notFound('Task not found'))
        }

        res.status(200).json(task);
    } catch (error) {
        next(error)
    }
};



export const updateTask = async (req, res, next) => {
    const { taskId } = req.params;
    const { taskTitle, priorityLevel, assignedTo, checklistItems, dueDate, taskStatus } = req.body;
    const updateFields = {};

    if (taskTitle) updateFields.taskTitle = taskTitle;
    if (priorityLevel) updateFields.priorityLevel = priorityLevel;
    if (taskStatus) updateFields.taskStatus = taskStatus;

    updateFields.assignedTo = assignedTo !== undefined ? assignedTo : null;
    updateFields.dueDate = dueDate ? new Date(dueDate) : null;

    if (checklistItems) {
        updateFields.checklistItems = checklistItems.map(item => ({
            text: item.text,
            isCompleted: item.isCompleted || false
        }));
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            updateFields,
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
    const { Id } = req.params;

    try {
        const task = await Task.findByIdAndDelete(Id);

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
                    todo: { $sum: { $cond: [{ $eq: ['$taskStatus', 'TODO'] }, 1, 0] } },
                    inProgress: { $sum: { $cond: [{ $eq: ['$taskStatus', 'PROGRESS'] }, 1, 0] } },
                    done: { $sum: { $cond: [{ $eq: ['$taskStatus', 'DONE'] }, 1, 0] } },
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
       next(error)
    }
};

