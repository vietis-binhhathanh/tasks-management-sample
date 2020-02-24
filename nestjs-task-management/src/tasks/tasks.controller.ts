import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.module';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    /**
     * GET
     * get all Task or filter
     */
    @Get()
    getTasks(@Query(ValidationPipe) filterDTO: GetTasksFilterDTO): Task[] {
      if (Object.keys(filterDTO).length) {
        return this.tasksService.getTasksWithFilter(filterDTO);
      } else {
        return this.tasksService.getAllTask();
      }
    }

    /**
     * GET
     * get one by id
     * @param id
     */
    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        const found =  this.tasksService.getTaskById(id);

        if (!found) {
          throw new NotFoundException(`Task with ID is "${id}" not found`);
        }

        return found;
    }

    /**
     * POST
     * body param DTO
     * create a task
     */
    @Post()
    @UsePipes(ValidationPipe)
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
     updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
         return this.tasksService.updateTaskStatus(id, status);
     }
}
