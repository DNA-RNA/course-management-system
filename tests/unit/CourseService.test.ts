import CourseService from '../../src/business/CourseService';
import { Course } from '../../src/models/Course';

describe('CourseService', () => {
    let courseService: CourseService;
    const mockCourse: Course = {
        id: 1,
        title: 'Introduction to Web Development',
        description: 'Learn web development fundamentals.',
        modules: []
    };

    beforeEach(() => {
        courseService = new CourseService();
    });

    it('should add a new course', async () => {
        const result = await courseService.add(mockCourse);
        expect(result).toEqual(mockCourse);
    });

    it('should retrieve all courses', async () => {
        await courseService.add(mockCourse);
        const result = await courseService.getAll();
        expect(result).toContainEqual(mockCourse);
    });

    it('should delete a course by ID', async () => {
        await courseService.add(mockCourse);
        await courseService.delete(mockCourse.id);
        const result = await courseService.delete(mockCourse.id);
        expect(result).not.toContainEqual(mockCourse);
    });
});
