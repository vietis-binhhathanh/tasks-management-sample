import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.module';
import * as uuid from 'uuid/v1';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    /**
     * get all Task
     */
    getAllTask(): Task[] {
        return this.tasks;
    }

    /**
     * filter tasks
     */
     getTasksWithFilter(filterDto: GetTasksFilterDTO): Task[] {
        const { status, search } = filterDto;

        let tasks = this.getAllTask();

        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if (search) {
            tasks = tasks.filter(task =>
                task.title.includes(search) ||
                task.description.includes(search),
            );
        }

        return tasks;
     }

    /**
     * get one by id
     * @param id
     */

     getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
     }

    /**
     * Create a task
     */
    createTask(createTaskDTO: CreateTaskDTO): Task {
        const { title, description } = createTaskDTO;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        }

        this.tasks.push(task);
        return task;
    }

    /**
     * delete a task
     */
    deleteTask(id: string): void {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
    }

    /**
     * update status with enum
     */
    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
