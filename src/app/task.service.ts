import { Injectable } from '@angular/core';
import { ApiConfigService } from './api-config.service';
import TaskModel from './models/taskModel';
import { Observable } from 'rxjs';
import TaskListModel from './models/taskListModel';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiConfigService: ApiConfigService) { }

  // to fetch all task lists
  getAllTaskLists(): Observable<TaskListModel[]> {
    return this.apiConfigService.get('tasklists');
  }

  //create a task list bucket
  createTaskList(title: string) {
    const data = {
      'title': title
    };

    return this.apiConfigService.post('tasklists', data);
  }

  //fetch all tasks inside a task list object
  getAllTasksForATaskList(taskListId: string) {
    return this.apiConfigService.get(`tasklists/${taskListId}/tasks`);
  }

  //create a task inside a particular task list object
  createTaskInsideATaskList(taskListId: string, title: string) {

    this.apiConfigService.post(`tasklists/${taskListId}/tasks`, { title });
  }

  //delete a task list
  deleteTaskList(taskListId: string) {
    return this.apiConfigService.delete(`tasklists/${taskListId}`);
  }

  //delete a task inside a task list
  deleteATaskInsideTaskList(taskListId: string, taskId: string) {
    return this.apiConfigService.delete(`tasklists/${taskListId}/tasks/${taskId}`);
  }

  updateTaskStatus(taskListId: string, taskObject: TaskModel) {
    const updateData = { completed: !taskObject.completed };
    return this.apiConfigService.patch(`tasklists/${taskListId}/tasks/${taskObject._id}`, updateData)
  }
}
