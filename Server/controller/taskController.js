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
        const tasks = await Task.find({ creator: creatorId });

        if (!tasks.length) {
            return next(CustomErrorHandler.notFound("No tasks found for this user."));
        }

        res.status(200).json({
            message: 'Tasks retrieved successfully',
            tasks
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
        const userEmail = req.headers.email; 
        console.log(userEmail)



        console.log('User ID received in backend:', userId);
        console.log('Email received:', userEmail);

        // Aggregate tasks
        const analytics = await UserTask.aggregate([
            {
                $match: {
                    $or: [
                        { userId: userId },
                        { assignto: userEmail }
                    ]
                }
            },
            {
                $group: {
                    _id: null, // Grouping all documents together
                    backlog: { $sum: { $cond: [{ $eq: ['$status', 'backlog'] }, 1, 0] } },
                    todo: { $sum: { $cond: [{ $eq: ['$status', 'todo'] }, 1, 0] } },
                    inProgress: { $sum: { $cond: [{ $eq: ['$status', 'inProgress'] }, 1, 0] } },
                    done: { $sum: { $cond: [{ $eq: ['$status', 'done'] }, 1, 0] } },
                    lowPriority: { $sum: { $cond: [{ $eq: ['$selectpriority', 'LOW PRIORITY'] }, 1, 0] } },
                    moderatePriority: { $sum: { $cond: [{ $eq: ['$selectpriority', 'MODERATE PRIORITY'] }, 1, 0] } },
                    highPriority: { $sum: { $cond: [{ $eq: ['$selectpriority', 'HIGH PRIORITY'] }, 1, 0] } },
                    dueDateTasks: { $sum: { $cond: [{ $ne: ['$duedate', null] }, 1, 0] } }
                }
            }
        ]);

        // If no analytics found, return zero counts
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
