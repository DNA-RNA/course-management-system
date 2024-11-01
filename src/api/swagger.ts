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
                Module: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Module title',
                        },
                        lessons: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Lesson',
                            },
                            description: 'List of lessons within the module',
                        },
                    },
                },
                Lesson: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Lesson title',
                        },
                        description: {
                            type: 'string',
                            description: 'Lesson description',
                        },
                        topics: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                            description: 'Topics covered in the lesson',
                        },
                        content: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Content',
                            },
                            description: 'Content of the lesson',
                        },
                    },
                },
                Content: {
                    type: 'object',
                    properties: {
                        type: {
                            type: 'string',
                            enum: ['text', 'video', 'audio'],
                            description: 'Type of content (text, video, audio)',
                        },
                        data: {
                            type: 'string',
                            description: 'URL or text data for the content',
                        },
                    },
                },


            },
        },
       
    },
    apis: ['./src/api/routes/*.ts', './src/api/controllers/*.ts'],
};


export const swaggerSpec = swaggerJSDoc(options);
