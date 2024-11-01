// services/ModuleDal.ts
import fs from 'fs/promises';
import path from 'path';
import { Module } from '../models/Module';

const DATA_FILE = path.join(__dirname, '../data/modules.json'); // modules.json dosya yolu

export class ModuleDal {
    
    async getAll(): Promise<Module[]> {
        try {
            const data = await fs.readFile(DATA_FILE, 'utf-8');
            const modules: Module[] = JSON.parse(data);
            return modules;
        } catch (error) {
            console.error('Error reading modules data:', error);
            throw new Error('Could not read modules data');
        }
    }
    async getModuleByTitle(title: string) : Promise<Module[] | Module | undefined> {
        try {
            const modules = await this.getAll();
            const module = modules.find((m: Module) => m.title === title);
           
            return module;
        } catch (error) {
            console.error('Error reading module:', error);
            throw new Error('Could not reading module');
        }
    }
    
    async add(module: Module): Promise<Module> {
        try {
            const modules = await this.getAll();
            modules.push(module);
            await this.saveAll(modules);
            return module;
        } catch (error) {
            console.error('Error adding module:', error);
            throw new Error('Could not add module');
        }
    }

    
    async update(module: Module, title: string): Promise<Module | null> {
        try {
            const modules = await this.getAll();
            const index = modules.findIndex((m) => m.title === title);
            if (index !== -1) {
                modules[index] = module;
                await this.saveAll(modules);
                return module;
            }
            return null; 
        } catch (error) {
            console.error('Error updating module:', error);
            throw new Error('Could not update module');
        }
    }


    async delete(title: string): Promise<boolean> {
        try {
            const modules = await this.getAll();
            const index = modules.findIndex((m) => m.title === title);
            if (index !== -1) {
                modules.splice(index, 1); 
                await this.saveAll(modules);
                return true;
            }
            return false; 
        } catch (error) {
            console.error('Error deleting module:', error);
            throw new Error('Could not delete module');
        }
    }

   
    private async saveAll(modules: Module[]): Promise<void> {
        try {
            await fs.writeFile(DATA_FILE, JSON.stringify(modules, null, 2)); 
        } catch (error) {
            console.error('Error saving modules data:', error);
            throw new Error('Could not save modules data');
        }
    }
}
