import { Module } from './Module';
export interface Course {
    id: number;
    title: string;
    description: string;
    modules: Module[];
}


