// services/LessonDal.ts
import fs from 'fs/promises';
import path from 'path';
import { Lesson } from '../models/Lesson';

const DATA_FILE = path.join(__dirname, '../data/lessons.json'); // lessons.json file path

export class LessonDal {
    
    async getAll(): Promise<Lesson[]> {
        try {
            const data = await fs.readFile(DATA_FILE, 'utf-8');
            const lessons: Lesson[] = JSON.parse(data);
            return lessons;
        } catch (error) {
            console.error('Error reading lessons data:', error);
            throw new Error('Could not read lessons data');
        }
    }

   
    async add(lesson: Lesson): Promise<Lesson> {
        try {
            const lessons = await this.getAll();
            lessons.push(lesson);
            await this.saveAll(lessons);
            return lesson;
        } catch (error) {
            console.error('Error adding lesson:', error);
            throw new Error('Could not add lesson');
        }
    }

    
    async update(lesson: Lesson, title: string): Promise<Lesson | null> { 
        try {       
            const lessons = await this.getAll();
            const index = lessons.findIndex((m) => m.title === title);
            if (index !== -1) {
                lessons[index] = lesson;
                await this.saveAll(lessons);
                return lesson;
            }
            return null; 
        } catch (error) {
            console.error('Error updating lesson:', error);
            throw new Error('Could not update lesson');
        }
    }

   
    async delete(title: string): Promise<boolean> {
        try {
            
            const lessons = await this.getAll();
            const index = lessons.findIndex((m) => m.title === title);
            if (index !== -1) {
                lessons.splice(index, 1); 
                await this.saveAll(lessons);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting lesson:', error);
            throw new Error('Could not delete lesson');
        }
    }

   
    private async saveAll(lessons: Lesson[]): Promise<void> {
        try {
            await fs.writeFile(DATA_FILE, JSON.stringify(lessons, null, 2)); // JSON format
        } catch (error) {
            console.error('Error saving lessons data:', error);
            throw new Error('Could not save lessons data');
        }
    }
}
