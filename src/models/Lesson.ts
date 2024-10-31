export interface Lesson {
    title: string;
    description: string;
    topics: string[];
    content: Content[];
}
export interface Content {
    type: 'text' | 'video' | 'audio';
    data: string;
}