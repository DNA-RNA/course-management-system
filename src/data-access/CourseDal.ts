import fs from 'fs/promises';
import path from 'path';
import { Course } from '../models/Course';

const DATA_FILE = path.join(__dirname, '../data/courses.json'); // courses.json file path conf

export class CourseDal {
    // get all courses
    async getAll(): Promise<Course[]> {
        try {
            const data = await fs.readFile(DATA_FILE, 'utf-8');
            const courses: Course[] = JSON.parse(data);
            return courses;
        } catch (error) {
            console.error('Error reading courses data:', error);
            throw new Error('Could not read courses data'); 
        }
    }

    // add new course
    async add(course: Course): Promise<Course> {
        try {
            const courses = await this.getAll(); 
            courses.push(course); 
            await this.saveAll(courses); 
            return course; 
        } catch (error) {
            console.error('Error adding course:', error);
            throw new Error('Could not add course'); 
        }
    }

    // update course
    async update(course: Course): Promise<Course | null> {
        try {
            const courses = await this.getAll(); 
            const index = courses.findIndex(c => c.id === course.id); 
            if (index !== -1) {
                courses[index] = course; 
                await this.saveAll(courses);
                return course; 
            }
            return null; 
        } catch (error) {
            console.error('Error updating course:', error);
            throw new Error('Could not update course'); 
        }
    }

    // delete course
    async delete(id: number): Promise<boolean> {
        try {
            const courses = await this.getAll();
            const newCourses = courses.filter(course => course.id !== id); 
            if (newCourses.length < courses.length) {
                await this.saveAll(newCourses); 
                return true; 
            }
            return false;
        } catch (error) {
            console.error('Error deleting course:', error);
            throw new Error('Could not delete course'); 
        }
    }

    // save file
    private async saveAll(courses: Course[]): Promise<void> {
        try {
            await fs.writeFile(DATA_FILE, JSON.stringify(courses, null, 2)); // JSON format
        } catch (error) {
            console.error('Error saving courses data:', error);
            throw new Error('Could not save courses data'); 
        }
    }
}
