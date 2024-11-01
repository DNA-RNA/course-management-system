import { Request, Response } from 'express';
import  CourseService  from '../../business/CourseService';
import { Course } from '../../models/Course';

export default class CourseController {
    private courseService: CourseService;

    constructor() {
        this.courseService = new CourseService();
    }
     /**
     * @swagger
     * /courses:
     *   get:
     *     summary: Get all courses
     *     tags: [Courses]
     *     responses:
     *       200:
     *         description: List of courses
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Course'
     */
    async getAllCourses(req: Request, res: Response) {
        try {
            
            const courses = await this.courseService.getAll(); // Tüm kursları al
            res.status(200).json(courses); // Kursları JSON formatında döndür
        } catch (err) {
           
            res.status(500).send({ message: 'Bir hata oluştu!' }); // Hata mesajı
        }
    }


    // // Tek bir kursu getirme
    // async getById(req: Request, res: Response) {
    //     const { id } = req.params;
    //     try {
    //         const course = await this.courseService.getById(Number(id));
    //         if (course) {
    //             res.status(200).json(course);
    //         } else {
    //             res.status(404).json({ message: 'Course not found' });
    //         }
    //     } catch (err) {
    //         res.status(500).json({ message: 'Error retrieving course' });
    //     }
    // }

   
    async add(req: Request, res: Response) {
        const course: Course = req.body;
        try {
            const addedCourse = await this.courseService.add(course);
            res.status(201).json(addedCourse);
        } catch (err) {
            res.status(500).json({ message: 'Error adding course' });
        }
    }

    
    async update(req: Request, res: Response) {
        const course: Course = req.body;
        try {
            const updatedCourse = await this.courseService.update(course);
            if (updatedCourse) {
                res.status(200).json(updatedCourse);
            } else {
                res.status(404).json({ message: 'Course not found' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Error updating course' });
        }
    }

   
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await this.courseService.delete(Number(id));
            if (result) {
                res.status(204).send(); // 204 No Content
            } else {
                res.status(404).json({ message: 'Course not found' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Error deleting course' });
        }
    }
}
