import { Router } from 'express';
import  ModuleController  from '../controllers/ModuleController';

const router = Router();
const moduleController = new ModuleController();

// CRUD operations

router.get('/modules', moduleController.getAll.bind(moduleController));
router.post('/module', moduleController.add.bind(moduleController));
router.put('/module/:title', moduleController.update.bind(moduleController));
router.delete('/module/:title', moduleController.delete.bind(moduleController));

export default router;
