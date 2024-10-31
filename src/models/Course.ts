import { Module } from './Module';
export type Course = {
    id: number;
    title: string;
    description: string;
    modules: Module[];
}


