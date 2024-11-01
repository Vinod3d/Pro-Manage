import mongoose from "mongoose";


const taskChecklistItemSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const userTaskSchema = new mongoose.Schema({
    taskTitle: {
        type: String,
        required: true,
    },
    priorityLevel: {
        type: String,
        enum: ['HIGH', 'MEDIUM', 'LOW'],
        required: true,
        default: 'HIGH',
    },
    assignedTo: {
        type: String,
        default: null,
        required: false,
    },
    checklistItems: {
        type: [taskChecklistItemSchema],
        required: true,
    },
    dueDate: {
        type: Date,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    taskStatus: {
        type: String,
        enum: ['BACKLOG', 'TODO', 'PROGRESS', 'DONE'],
        default: 'TODO',
    },
    shareableLink: {
        type: String,
        default: null,
    },
});

userTaskSchema.pre('save', function (next) {
    this.lastUpdated = Date.now();
    next();
});

export default mongoose.model("Task", userTaskSchema);
