import { TaskStatus } from '../task.module';

export class GetTasksFilterDTO {
    status: TaskStatus;
    search: string;
}
