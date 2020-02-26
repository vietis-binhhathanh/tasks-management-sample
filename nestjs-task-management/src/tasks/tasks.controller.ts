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
  UseGuards, Logger,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');
    constructor(private tasksService: TasksService) {}

    /**
     * GET
     * get all Task or filter
     */
    @Get()
    getTasks(
      @Query(ValidationPipe) filterDTO: GetTasksFilterDTO,
      @GetUser() user: User,
      ) {
      return this.tasksService.getTasks(filterDTO, user);
    }

    /**
     * GET
     * get one by id
     * @param id
     */
    @Get('/:id')
    getTaskById(@Param('id') id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    /**
   * POST
   * body param DTO
   * create a task
   */
    @Post()
    @UsePipes(ValidationPipe)
    createTask(
      @Body() createTaskDTO: CreateTaskDTO,
      @GetUser() user: User
      ): Promise<Task> {
        return this.tasksService.createTask(createTaskDTO, user);
    }

    /**
     * DELETE
     * delete a task by id
     * @param id
     */
     @Delete('/:id')
     deleteTask(@Param('id') id: number): Promise<void> {
         return this.tasksService.deleteTask(id);
     }

     /**
      * PATCH
      * update status task
      * @param id
      * @param status
      */
     @Patch('/:id/status')
     updateTaskStatus(
       @Param('id') id: number,
       @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
         return this.tasksService.updateTaskStatus(id, status);
     }
}
