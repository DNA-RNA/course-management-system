import request from 'supertest'; // HTTP istekleri yapmak için supertest kullanıyoruz
import app from '../../src/api/index'; // Uygulamanın ana dosyasını import ediyoruz

describe('LessonController', () => {
    const mockContent = [
        {
            type: 'text',
            data: 'HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.',
        },
    ];

    const mockLesson = {
        title: 'Introduction to Web Development',
        description: 'Learn web development fundamentals.',
        topics: ['CSS', 'HTTP'],
        content: mockContent,
    };

    let createdLessonId: string; // Oluşturulacak dersin ID'si

    it('should create a new lesson', async () => {
        const response = await request(app)
            .post('/lessons') // API endpoint
            .send(mockLesson) // Mock ders verisini gönder
            .expect(201); // Başarı durum kodunu bekliyoruz

        createdLessonId = response.body.id; // Oluşturulan dersin ID'sini kaydediyoruz
        expect(response.body).toMatchObject(mockLesson); // Yanıtın mockLesson ile eşleşmesini bekliyoruz
    });

    it('should retrieve all lessons', async () => {
        const response = await request(app)
            .get('/lessons') // Tüm dersleri alma endpoint'i
            .expect(200); // Başarı durum kodunu bekliyoruz

        expect(response.body).toContainEqual({ ...mockLesson, id: createdLessonId }); // Mock dersin yanıt içinde bulunmasını bekliyoruz
    });

    it('should delete a lesson by title', async () => {
        await request(app)
            .delete(`/lessons/${createdLessonId}`) // Ders silme endpoint'i
            .expect(204); // Silme işlemi için başarı durumu (No Content)

        const response = await request(app)
            .get('/lessons') // Silinmeden sonra tüm dersleri alma endpoint'i
            .expect(200);

        expect(response.body).not.toContainEqual({ ...mockLesson, id: createdLessonId }); // Silinen dersin artık yanıt içinde olmamasını bekliyoruz
    });
});
