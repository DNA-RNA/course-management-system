import { Router } from 'express';
import  LessonController  from '../controllers/LessonController';

const router = Router();
const lessonController = new LessonController();

// CRUD operations

router.get('/lessons', lessonController.getAll.bind(lessonController));
router.post('/lesson', lessonController.add.bind(lessonController));
router.put('/lesson/:title', lessonController.update.bind(lessonController));
router.delete('/lesson/:title', lessonController.delete.bind(lessonController));

export default router;
