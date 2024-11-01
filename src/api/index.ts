// src/api/index.ts
import express from 'express';
import {logMiddleware}  from '../utils/logger';
import CourseRouter from './routes/CourseRouter';
import ModuleRouter from './routes/ModuleRouter';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logMiddleware);

// API router'ını ekleyin
app.use('/api', CourseRouter);
app.use('/api', ModuleRouter);


// Swagger dokümantasyonunu kullanıma sun
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// Genel hata işleme middleware'i
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Bir hata oluştu!', error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
    console.log(`API docs available at http://localhost:${PORT}/api-docs`);
});
