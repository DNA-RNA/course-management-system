import { Router } from 'express';
import  CourseController  from '../controllers/CourseController';

const router = Router();
const courseController = new CourseController();

// CRUD endpoint

router.get('/courses', courseController.getAllCourses.bind(courseController));
router.post('/course', courseController.add.bind(courseController));
router.put('/course/:id', courseController.update.bind(courseController));
router.delete('/course/:id', courseController.delete.bind(courseController));

export default router;
