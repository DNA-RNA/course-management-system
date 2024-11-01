import { Request, Response } from 'express';
import  ModuleService  from '../../business/ModuleService';
import { Module } from '../../models/Module';

export default class ModuleController {
    private moduleService: ModuleService;

    constructor() {
        this.moduleService = new ModuleService();
    }
   
    async getAllCourses(req: Request, res: Response) {
        try {
            
            const courses = await this.moduleService.getAll(); // Tüm kursları al
            res.status(200).json(courses); // Kursları JSON formatında döndür
        } catch (err) {
           
            res.status(500).send({ message: 'Bir hata oluştu!' }); // Hata mesajı
        }
    }


    async add(req: Request, res: Response) {
        const module: Module = req.body;
        try {
            const addedCourse = await this.moduleService.add(module);
            res.status(201).json(addedCourse);
        } catch (err) {
            res.status(500).json({ message: 'Error adding module' });
        }
    }

    // Kurs güncelleme
    async update(req: Request, res: Response) {
        const module: Module = req.body;
        const { title } = req.params;
        try {
            const updatedCourse = await this.moduleService.update(module,title);
            if (updatedCourse) {
                let message = "Module Updated"
                res.status(200).json({ message,updatedCourse});
            } else {
                res.status(404).json({ message: 'Course not found' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Error updating module' });
        }
    }

    // Kurs silme
    async delete(req: Request, res: Response) {
        const { title } = req.params;
        try {
            const result = await this.moduleService.delete(title);
            if (result) {
                res.status(204).send(); // 204 No Content
            } else {
                res.status(404).json({ message: 'module not found' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Error deleting module' });
        }
    }
}
