import express from 'express'
import auth from '../middleware/auth.js'
import { 
    analyticsdata,
    createTask,
    deleteTask,
    getTaskByCreatorId,
    getTaskById,
    updateTask
 } from '../controller/taskController.js'

const router = express.Router()

router.post("/create", auth, createTask);
router.get("/tasks", auth, getTaskByCreatorId);
router.get('/:Id', getTaskById);
router.patch('/tasks/:taskId', auth, updateTask);
router.delete('/:Id', deleteTask);
router.get('/tasks/analytics', auth, analyticsdata);
export default router;