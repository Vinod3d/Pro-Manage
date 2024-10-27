import express from 'express'
import auth from '../middleware/auth.js'
import { analyticsdata, createTask, deleteTask, getTaskByCreatorId, updateTask } from '../controller/taskController.js'

const router = express.Router()

router.post("/create", auth, createTask);
router.get("/tasks", auth, getTaskByCreatorId);
router.patch('/tasks/:taskId', auth, updateTask);
router.delete('/:id', deleteTask);
router.get('/tasks/analytics', auth, analyticsdata);
export default router;