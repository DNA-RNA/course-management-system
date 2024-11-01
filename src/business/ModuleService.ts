// business/CourseService.ts
import {ModuleDal} from '../data-access/ModuleDal';
import {logger} from '../utils/logger'; 
import { moduleSchema } from '../utils/validation'; 
import { Module } from '../models/Module';

export default  class CourseService {
    private moduleDal: ModuleDal;

    constructor() {
        this.moduleDal = new ModuleDal();
    }

    
    async getAll(): Promise<Module[]> {
        try {
            const getModule = await this.moduleDal.getAll();
            logger.info('Module fetched ');
           
            return getModule
        } catch (err) {
            if (err instanceof Error) {
                logger.error(`Error fetching module: ${err.message}`);
            } else {
                logger.error('Unknown error occurred while  fetching module');
            }
            throw err;
        }
    }  
    
    async add(module: Module): Promise<Module> {
    const { error } = moduleSchema.validate(module);
        if (error) {
            logger.error(`Validation error: ${error.message}`);
            throw new Error(`Validation error: ${error.message}`);
        }

        try {
            const addedModule = await this.moduleDal.add(module);
            logger.info(`Course added: ${JSON.stringify(addedModule)}`);
            return addedModule;
        } catch (err) {
            if (err instanceof Error) {
                logger.error(`Error adding course: ${err.message}`);
            } else {
                logger.error('Unknown error occurred while adding course');
            }
            throw err;
        }
    }


    async update(module: Module, title: string): Promise<Module | null> {
        const { error } = moduleSchema.validate(module);
        if (error) {
            logger.error(`Validation error: ${error.message}`);
            throw new Error(`Validation error: ${error.message}`);
        }

        try {
            const updatedCourse = await this.moduleDal.update(module,title);
            if (updatedCourse) {
                logger.info(`Course updated: ${JSON.stringify(updatedCourse)}`);
            } else {
                logger.warn(`Course not found for update: ${module.title}`);
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


    
    async delete(title: string): Promise<boolean> {
        try {
            const result = await this.moduleDal.delete(title);
            if (result) {
                logger.info(`Course deleted: ${title}`);
            } else {
                logger.warn(`Course not found for deletion: ${title}`);
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


