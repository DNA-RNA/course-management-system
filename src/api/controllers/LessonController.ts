import { Request, Response } from 'express';
import  LessonService  from '../../business/LessonService';
import { Lesson } from '../../models/Lesson';
import {logger} from '../../utils/logger'; 

export default class ModuleController {
    private lessonService: LessonService;

    constructor() {
        this.lessonService = new LessonService();
    }
   
    /**
     * @swagger
     * /lessons:
     *   get:
     *     summary: Get all lessons
     *     tags: [Lesson]
     *     responses:
     *       200:
     *         description: List of lessons
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Lesson' 
     */
    async getAll(req: Request, res: Response) {
        try {
            
            const lessons = await this.lessonService.getAll(); 
            logger.info("Fetching Lesson");
            res.status(200).json({lessons}); 
        } catch (err) {
           
            if (err instanceof Error) {
                logger.error(`Error fetching Lesson: ${err.message}` + req); 
            } else {
                logger.error('Unknown error occurred while fetching Lesson' + req); 
            }
            res.status(500).json({ message: 'Error fetching Lesson' });
        }
    }

/**
 * @swagger
 * /lesson:
 *   post:
 *     summary: Add a new Lesson
 *     tags: [Lesson]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lesson'
 *     responses:
 *       200:
 *         description: Lesson added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lesson'
 *       500:
 *         description: Error adding Lesson
 */
    async add(req: Request, res: Response) {
        const lesson: Lesson = req.body;
        try {
            const addedLesson = await this.lessonService.add(lesson);
            logger.info(`Adding lesson: ${JSON.stringify(addedLesson)}`);
           
            res.status(200).json(addedLesson);
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
 * /lesson/{title}:
 *   put:
 *     summary: Update a lesson by title
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         description: The title of the lesson to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lesson'
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lesson'
 *       404:
 *         description: Lesson not found
 *       500:
 *         description: Error updating Lesson
 */
    async update(req: Request, res: Response) {
        const lesson: Lesson = req.body;
        const { title } = req.params;
        try {
            const updatedLesson = await this.lessonService.update(lesson,title);
            logger.info(`updated lesson: ${JSON.stringify(updatedLesson)}`);
            if (updatedLesson) {
                let message = "Lesson Updated"
                res.status(200).json({ message,updatedLesson});
            } else {
                res.status(404).json({ message: 'Lesson not found' });
            }
        } catch (err) {
            if (err instanceof Error) {
                logger.error(`Error updating Lesson: ${err.message}` + req); 
            } else {
                logger.error('Unknown error occurred while updating Lesson' + req); 
            }
            res.status(500).json({ message: 'Error updating Lesson' });
        }
    }

  /**
 * @swagger
 * /lesson/{title}:
 *   delete:
 *     summary: Delete a lesson by title
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         description: The title of the Lesson to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lesson deleted successfully"
 *       404:
 *         description: Lesson not found
 *       500:
 *         description: Error deleting Lesson
 */
    async delete(req: Request, res: Response) {
        const { title } = req.params;
        try {
            const result = await this.lessonService.delete(title);
            if (result) {
                logger.info(`Deleting lesson: ${JSON.stringify(result)}`);
                res.status(200).send(); 
            } else {
                res.status(404).json({ message: 'lesson not found' });
            }
        } catch (err) {
            if (err instanceof Error) {
                logger.error(`Error delete Lesson: ${err.message}` + req); 
            } else {
                logger.error('Unknown error occurred while deleting Lesson' + req); 
            }
            res.status(500).json({ message: 'Error delete Lesson' });
        }
    }
}
