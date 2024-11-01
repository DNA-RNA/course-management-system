import request from 'supertest'; // HTTP istekleri yapmak için supertest kullanıyoruz
import app from '../../src/api/index';// Uygulamanın ana dosyasını import ediyoruz

describe('ModuleController', () => {
    const mockModule = {
        title: 'Introduction to JavaScript',
        description: 'Learn the fundamentals of JavaScript programming.',
        lessons: [], // Başlangıçta ders listesi boş
    };

    let createdModuleId: string; // Oluşturulacak modülün ID'si

    it('should create a new module', async () => {
        const response = await request(app)
            .post('/modules') // API endpoint
            .send(mockModule) // Mock modül verisini gönder
            .expect(201); // Başarı durum kodunu bekliyoruz

        createdModuleId = response.body.id; // Oluşturulan modülün ID'sini kaydediyoruz
        expect(response.body).toMatchObject(mockModule); // Yanıtın mockModule ile eşleşmesini bekliyoruz
    });

    it('should retrieve all modules', async () => {
        const response = await request(app)
            .get('/modules') // Tüm modülleri alma endpoint'i
            .expect(200); // Başarı durum kodunu bekliyoruz

        expect(response.body).toContainEqual({ ...mockModule, id: createdModuleId }); // Mock modülün yanıt içinde bulunmasını bekliyoruz
    });

    it('should delete a module by ID', async () => {
        await request(app)
            .delete(`/modules/${createdModuleId}`) // Modül silme endpoint'i
            .expect(204); // Silme işlemi için başarı durumu (No Content)

        const response = await request(app)
            .get('/modules') // Silinmeden sonra tüm modülleri alma endpoint'i
            .expect(200);

        expect(response.body).not.toContainEqual({ ...mockModule, id: createdModuleId }); // Silinen modülün artık yanıt içinde olmamasını bekliyoruz
    });
});
