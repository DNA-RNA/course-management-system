import { Request, Response } from 'express';
import  CourseService  from '../../business/CourseService';
import { Course } from '../../models/Course';
import {logger} from '../../utils/logger'; 

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
           
           
            const courses = await this.courseService.getAll(); 
            logger.info("Fetching course");
            let message = "Courses fetched"
            res.status(200).json({ message,courses});
           
        } catch (err) {
           
            if (err instanceof Error) {
                logger.error(`Error fetching course: ${err.message}` + req); 
            } else {
                logger.error('Unknown error occurred while fetching course' + req); 
            }
            res.status(500).json({ message: 'Error fetching course' });
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

 /**
 * @swagger
 * /course:
 *   post:
 *     summary: Add a new course
 *     tags: [Course]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       500:
 *         description: Error adding course
 */
    async add(req: Request, res: Response) {
        const course: Course = req.body;

        try {
            const addedCourse = await this.courseService.add(course);
            logger.info(`Adding course: ${JSON.stringify(course)}`);
           
            res.status(200).json(addedCourse);
        } catch (err) {
            if (err instanceof Error) {
                logger.error(`Error adding course: ${err.message}`); 
            } else {
                logger.error('Unknown error occurred while adding course'); 
            }
            res.status(500).json({ message: 'Error adding course' });
        }
    }

   /**
 * @swagger
 * /course/{id}:
 *   put:
 *     summary: Update a course by ID
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the course to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *       500:
 *         description: Error updating course
 */
    async update(req: Request, res: Response) {
        const course: Course = req.body;
        try {
            const updatedCourse = await this.courseService.update(course);
            logger.info(`Updating course: ${JSON.stringify(course)}`);
            
            res.status(200).json(updatedCourse);
           
        } catch (err) {
            if (err instanceof Error) {
                logger.error(`Error updating course: ${err.message}`); 
            } else {
                logger.error('Unknown error occurred while updating course'); 
            }
            res.status(500).json({ message: 'Error updating course' });
        }
    }

   /**
 * @swagger
 * /course/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the course to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Course deleted successfully"
 *       404:
 *         description: Course not found
 *       500:
 *         description: Error deleting course
 */
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const deletedCourse = await this.courseService.delete(Number(id));
            logger.info(`Deleting course: ${JSON.stringify(deletedCourse)}`);
            let message = "Course Deleted"
            res.status(200).json({ message,deletedCourse});
           
        } catch (err) {
            if (err instanceof Error) {
                logger.error(`Error deleting course: ${err.message}`); 
            } else {
                logger.error('Unknown error occurred while deleting course'); 
            }
            res.status(500).json({ message: 'Error deleting course' });
        }
    }
}
