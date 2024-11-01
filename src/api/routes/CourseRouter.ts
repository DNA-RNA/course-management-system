import { Router } from 'express';
import  CourseController  from '../controllers/CourseController';

const router = Router();
const courseController = new CourseController();

// CRUD işlemleri için endpoint'ler

router.get('/courses', courseController.getAllCourses.bind(courseController));
// router.get('/courses/:id', courseController.getCourseById.bind(courseController));
router.post('/courses', courseController.add.bind(courseController));
router.put('/courses/:id', courseController.update.bind(courseController));
router.delete('/courses/:id', courseController.delete.bind(courseController));

export default router;
