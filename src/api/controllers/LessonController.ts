import { Request, Response } from 'express';
import  LessonService  from '../../business/LessonService';
import { Lesson } from '../../models/Lesson';

export default class ModuleController {
    private lessonService: LessonService;

    constructor() {
        this.lessonService = new LessonService();
    }
   
    async getAll(req: Request, res: Response) {
        try {
            
            const courses = await this.lessonService.getAll(); 
            res.status(200).json(courses); 
        } catch (err) {
           
            res.status(500).send({ message: 'Bir hata oluştu!' }); 
        }
    }


    async add(req: Request, res: Response) {
        const lesson: Lesson = req.body;
        try {
            const addedCourse = await this.lessonService.add(lesson);
            let message = "Lesson Added"
            res.status(200).json({ message,addedCourse});
        } catch (err) {
            res.status(500).json({ message: 'Error adding lesson' });
        }
    }

   
    async update(req: Request, res: Response) {
        const lesson: Lesson = req.body;
        const { title } = req.params;
        try {
            const updatedLesson = await this.lessonService.update(lesson,title);
            if (updatedLesson) {
                let message = "Lesson Updated"
                res.status(200).json({ message,updatedLesson});
            } else {
                res.status(404).json({ message: 'Lesson not found' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Error updating lesson' });
        }
    }

 
    async delete(req: Request, res: Response) {
        const { title } = req.params;
        try {
            const result = await this.lessonService.delete(title);
            if (result) {
                res.status(204).send(); // 204 No Content
            } else {
                res.status(404).json({ message: 'lesson not found' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Error deleting lesson' });
        }
    }
}
