import { Lesson } from './Lesson';

export interface Module {
    title: string;
    lessons: Lesson[];
}