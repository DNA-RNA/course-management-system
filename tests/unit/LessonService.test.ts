import LessonService from '../../src/business/LessonService';
import { Lesson } from '../../src/models/Lesson';
import { Content } from '../../src/models/Lesson';

describe('LessonService', () => {
    let lessonService: LessonService;

    const mockContent: Content[] = [ // Content'i dizi olarak tanımladık
        {
            type: 'text', // Burada içerik tipini tanımlıyoruz
            data: 'HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.',
        },
    ];

    const mockLesson: Lesson = {
        title: 'Introduction to Web Development',
        description: 'Learn web development fundamentals.',
        topics: ['CSS', 'HTTP'],
        content: mockContent, // mockContent burada dizi olarak kullanılıyor
    };

    beforeEach(() => {
        lessonService = new LessonService();
    });

    it('should add a new lesson', async () => {
        const result = await lessonService.add(mockLesson);
        expect(result).toEqual(mockLesson);
    });

    it('should retrieve all lessons', async () => {
        await lessonService.add(mockLesson);
        const result = await lessonService.getAll();
        expect(result).toContainEqual(mockLesson);
    });

    it('should delete a lesson by ID', async () => {
        await lessonService.add(mockLesson);
        await lessonService.delete(mockLesson.title); 
        const result = await lessonService.getAll(); // Tüm lesson'ları tekrar al
        expect(result).not.toContainEqual(mockLesson); 
    });
});
