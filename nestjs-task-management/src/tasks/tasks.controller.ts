import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.module';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    /**
     * GET
     * get all Task
     */
    @Get()
    getTasks(@Query() filterDTO: GetTasksFilterDTO): Task[] {
        return this.tasksService.getTasksWithFilter(filterDTO);
    }

    /**
     * GET
     * get one by id
     * @param id
     */

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    /**
     * POST
     * body param DTO
     * create a task
     */
    @Post()
    createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
        return this.tasksService.createTask(createTaskDTO);
    }

    /**
     * DELETE
     * delete a task by id
     * @param id
     */

     @Delete('/:id')
     deleteTask(@Param('id') id: string): void {
         this.tasksService.deleteTask(id);
     }

     /**
      * PATCH
      * update status task
      * @param id
      * @param status
      */
     @Patch('/:id/status')
     updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
         return this.tasksService.updateTaskStatus(id, status);
     }

}
