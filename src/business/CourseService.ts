// business/CourseService.ts
import {CourseDal} from '../data-access/CourseDal';
import {logger} from '../utils/logger'; 
import { courseSchema } from '../utils/validation'; 
import { Course } from '../models/Course';

export default  class CourseService {
    private courseDal: CourseDal;

    constructor() {
        this.courseDal = new CourseDal();
    }

    
    async getAll(): Promise<Course[]> {
        try {
            const getCourses = await this.courseDal.getAll();
            logger.info('Courses fetched ');
           
            return getCourses
        } catch (err) {
            if (err instanceof Error) {
                logger.error(`Error adding course: ${err.message}`);
            } else {
                logger.error('Unknown error occurred while adding course');
            }
            throw err;
        }
    }  
    
    async add(course: Course): Promise<Course> {
    const { error } = courseSchema.validate(course);
        if (error) {
            logger.error(`Validation error: ${error.message}`);
            throw new Error(`Validation error: ${error.message}`);
        }

        try {
            const addedCourse = await this.courseDal.add(course);
            logger.info(`Course added: ${JSON.stringify(addedCourse)}`);
            return addedCourse;
        } catch (err) {
            if (err instanceof Error) {
                logger.error(`Error adding course: ${err.message}`);
            } else {
                logger.error('Unknown error occurred while adding course');
            }
            throw err;
        }
    }


    async update(course: Course): Promise<Course | null> {
        const { error } = courseSchema.validate(course);
        if (error) {
            logger.error(`Validation error: ${error.message}`);
            throw new Error(`Validation error: ${error.message}`);
        }

        try {
            const updatedCourse = await this.courseDal.update(course);
            if (updatedCourse) {
                logger.info(`Course updated: ${JSON.stringify(updatedCourse)}`);
            } else {
                logger.warn(`Course not found for update: ${course.id}`);
            }
            return updatedCourse;
        } catch (err) {
            if (err instanceof Error) {
                logger.error(`Error updating course: ${err.message}`);
            } else {
                logger.error('Unknown error occurred while updating course');
            }
            throw err;
        }
    }


    
    async delete(id: number): Promise<boolean> {
        try {
            const result = await this.courseDal.delete(id);
            if (result) {
                logger.info(`Course deleted: ${id}`);
            } else {
                logger.warn(`Course not found for deletion: ${id}`);
            }
            return result;
        } catch (err) {
            if (err instanceof Error) {
                logger.error(`Error deleting course: ${err.message}`);
            } else {
                logger.error('Unknown error occurred while deleting course');
            }
            throw err; 
        }
    }
}


