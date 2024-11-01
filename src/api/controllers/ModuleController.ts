import { Request, Response } from 'express';
import  ModuleService  from '../../business/ModuleService';
import { Module } from '../../models/Module';
import {logger} from '../../utils/logger'; 

export default class ModuleController {
    private moduleService: ModuleService;

    constructor() {
        this.moduleService = new ModuleService();
    }
   /**
     * @swagger
     * /modules:
     *   get:
     *     summary: Get all modules
     *     tags: [Modules]
     *     responses:
     *       200:
     *         description: List of modules
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Module' 
     */
    async getAll(req: Request, res: Response) {
        try {
            
            const courses = await this.moduleService.getAll(); // Tüm kursları al
            res.status(200).json(courses); // Kursları JSON formatında döndür
        } catch (err) {
           
            res.status(500).send({ message: 'Bir hata oluştu!' }); // Hata mesajı
        }
    }

/**
 * @swagger
 * /module:
 *   post:
 *     summary: Add a new module
 *     tags: [Module]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Module'
 *     responses:
 *       200:
 *         description: Module added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Module'
 *       500:
 *         description: Error adding Module
 */
    async add(req: Request, res: Response) {
        const module: Module = req.body;
        try {
         
           
            const addedLesson = await this.moduleService.add(module);
            logger.info(`Adding module: ${JSON.stringify(addedLesson)}`);
            res.status(200).json(addedLesson);
        } catch (err) {
            if (err instanceof Error) {
                logger.error(`Error adding Module: ${err.message}`); 
            } else {
                logger.error('Unknown error occurred while adding Module'); 
            }
            res.status(500).json({ message: 'Error adding Module' });
        }
    }

   /**
 * @swagger
 * /module/{title}:
 *   put:
 *     summary: Update a module by title
 *     tags: [Module]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         description: The title of the module to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Module'
 *     responses:
 *       200:
 *         description: Module updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Module'
 *       404:
 *         description: Module not found
 *       500:
 *         description: Error updating Module
 */   
    async update(req: Request, res: Response) {
        const module: Module = req.body;
        const { title } = req.params;
        try {
            const updatedCourse = await this.moduleService.update(module,title);
            if (updatedCourse) {
                let message = "Module Updated"
                res.status(200).json({ message,updatedCourse});
            } else {
                res.status(404).json({ message: 'module not found' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Error updating module' });
        }
    }

    /**
 * @swagger
 * /module/{title}:
 *   delete:
 *     summary: Delete a module by title
 *     tags: [Module]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         description: The title of the module to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: module deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "module deleted successfully"
 *       404:
 *         description: module not found
 *       500:
 *         description: Error deleting module
 */
    async delete(req: Request, res: Response) {
        const { title } = req.params;
        try {
            const result = await this.moduleService.delete(title);

            
            if (result) {
                logger.info(`Deleting module: ${JSON.stringify(result)}`);
                res.status(200).send(); 
            } else {
                res.status(404).json({ message: 'module not found' });
            }
        } catch (err) {
            if (err instanceof Error) {
                logger.error(`Error delete module: ${err.message}` + req); 
            } else {
                logger.error('Unknown error occurred while deleting module' + req); 
            }
            res.status(500).json({ message: 'Error delete module' });
        }
      
    }

}
