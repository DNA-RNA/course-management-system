import request from 'supertest';
import app  from '../../src/api/index'; 
import { Course } from '../../src/models/Course';

describe('Course API Integration Tests', () => {
    const mockCourse: Course = {
        id: 1,
        title: 'Introduction to Web Development',
        description: 'Learn the fundamentals of web development',
        modules: []
    };

    it('should create a new course', async () => {
        const response = await request(app)
            .post('/courses')
            .send(mockCourse)
            .expect(200);
        expect(response.body).toMatchObject(mockCourse);
    });

    it('should retrieve all courses', async () => {
        await request(app).post('/courses').send(mockCourse);
        const response = await request(app).get('/courses').expect(200);
        expect(response.body).toContainEqual(mockCourse);
    });

    it('should delete a course by ID', async () => {
        await request(app).post('/courses').send(mockCourse);
        const response = await request(app).delete(`/courses/${mockCourse.id}`).expect(200);
        expect(response.body.message).toBe('Course deleted successfully');
        
        const getAllResponse = await request(app).get('/courses').expect(200);
        expect(getAllResponse.body).not.toContainEqual(mockCourse);
    });
});
