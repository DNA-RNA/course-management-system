import ModuleService from '../../src/business/ModuleService'; // ModuleService'i içe aktar
import { Module } from '../../src/models/Module'; // Module modelini içe aktar

describe('ModuleService', () => {
    let moduleService: ModuleService;

    const mockModule: Module = {
    
        title: 'Introduction to Programming',
        lessons: []
    };

    beforeEach(() => {
        moduleService = new ModuleService();
    });

    it('should add a new module', async () => {
        const result = await moduleService.add(mockModule);
        expect(result).toEqual(mockModule);
    });

    it('should retrieve all modules', async () => {
        await moduleService.add(mockModule);
        const result = await moduleService.getAll();
        expect(result).toContainEqual(mockModule);
    });

    it('should delete a module by title', async () => {
        await moduleService.add(mockModule);
        await moduleService.delete(mockModule.title); 
        const result = await moduleService.getAll(); 
        expect(result).not.toContainEqual(mockModule); 
    });
});
