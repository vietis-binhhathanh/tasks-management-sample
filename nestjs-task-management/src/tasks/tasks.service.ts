import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDTO);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID: "${id}" not found`);
    }

    return found;
  }

    /**
     * Create a task
     */
    async createTask(createTaskDTO: CreateTaskDTO) {
      return this.taskRepository.createTask(createTaskDTO);
    }

    /**
     * delete a task
     */
    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);

        if (result.affected === 0) {
          throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }

    /**
     * update status with enum
     */
    async updateTaskStatus(id: number, status: TaskStatus) {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();

        return task;
    }
}
