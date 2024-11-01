import {LessonDal} from '../data-access/LessonDal';
import {logger} from '../utils/logger'; 
import { lessonSchema } from '../utils/validation'; 
import { Lesson } from '../models/Lesson';

export default  class CourseService {
    private lessonDal: LessonDal;

    constructor() {
        this.lessonDal = new LessonDal();
    }

    
    async getAll(): Promise<Lesson[]> {
        try {
            const getModule = await this.lessonDal.getAll();
            logger.info('Lesson fetched ');
           
            return getModule
        } catch (err) {
            if (err instanceof Error) {
                logger.error(`Error  while fetching lesson: ${err.message}`);
            } else {
                logger.error('Unknown error occurred while  fetching lesson');
            }
            throw err;
        }
    }  
    
    async add(lesson: Lesson): Promise<Lesson> {
    const { error } = lessonSchema.validate(lesson);
        if (error) {
            logger.error(`Validation error: ${error.message}`);
            throw new Error(`Validation error: ${error.message}`);
        }

        try {
            const addedLesson = await this.lessonDal.add(lesson);
            logger.info(`Lesson added: ${JSON.stringify(addedLesson)}`);
            return addedLesson;
        } catch (err) {
            if (err instanceof Error) {
                logger.error(`Error adding lesson: ${err.message}`);
            } else {
                logger.error('Unknown error occurred while adding lesson');
            }
            throw err;
        }
    }


    async update(lesson: Lesson, title: string): Promise<Lesson | null> {
        const { error } = lessonSchema.validate(lesson);
        if (error) {
            logger.error(`Validation error: ${error.message}`);
            throw new Error(`Validation error: ${error.message}`);
        }

        try {
            const updatedLesson = await this.lessonDal.update(lesson,title);
            if (updatedLesson) {
                logger.info(`Lesson updated: ${JSON.stringify(updatedLesson)}`);
            } else {
                logger.warn(`Lesson not found for update: ${lesson.title}`);
            }
            return updatedLesson;
        } catch (err) {
            if (err instanceof Error) {
                logger.error(`Error updating Lesson: ${err.message}`);
            } else {
                logger.error('Unknown error occurred while updating Lesson');
            }
            throw err;
        }
    }


    
    async delete(title: string): Promise<boolean> {
        try {
            const result = await this.lessonDal.delete(title);
            if (result) {
                logger.info(`Lesson deleted: ${title}`);
            } else {
                logger.warn(`Lesson not found for deletion: ${title}`);
            }
            return result;
        } catch (err) {
            if (err instanceof Error) {
                logger.error(`Error deleting Lesson: ${err.message}`);
            } else {
                logger.error('Unknown error occurred while deleting Lesson');
            }
            throw err; 
        }
    }
}


