import swaggerJSDoc from 'swagger-jsdoc';
import { Options } from 'swagger-jsdoc';



const options: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Course Management API',
            version: '1.0.0',
            description: 'A simple API for managing courses',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
        components: {
            schemas: {
                Course: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Course ID',
                        },
                        title: {
                            type: 'string',
                            description: 'Course title',
                        },
                        description: {
                            type: 'string',
                            description: 'Course description',
                        },
                        modules: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    title: { type: 'string' },
                                    lessons: { type: 'array', items: { type: 'object' } },
                                },
                            },
                        },
                    },
                },
            },
        },
       
    },
    apis: ['./src/api/routes/*.ts', './src/api/controllers/*.ts'],
};


export const swaggerSpec = swaggerJSDoc(options);
