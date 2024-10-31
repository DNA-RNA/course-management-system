export type Lesson = {
    title: string;
    description: string;
    topics: string[];
    content: Content[];
}
export type Content = {
    type: 'text' | 'video' | 'audio';
    data: string;
}