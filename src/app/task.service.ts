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
    return this.apiConfigService.getTaskLists('tasklists');
  }

  getAllTasks(taskListId: string): Observable<TaskModel[]> {
    return this.apiConfigService.getTasks(`tasklists/${taskListId}`);
  }

  //create a task list bucket
  createTaskList(title: string): Observable<TaskListModel> {
    const data = {
      'title': title
    };

    return this.apiConfigService.post('tasklists', data);
  }

  //fetch all tasks inside a task list object
  getAllTasksForATaskList(taskListId: string) {
    return this.apiConfigService.getTasks(`tasklists/${taskListId}/tasks`);
  }

  //create a task inside a particular task list object
  createTaskInsideATaskList(taskListId: string, title: string) {

    return this.apiConfigService.post(`tasklists/${taskListId}/tasks`, { title });
  }

  //delete a task list
  deleteTaskList(taskListId: string): Observable<TaskListModel> {
    return this.apiConfigService.deleteTaskList(`tasklists/${taskListId}`);
  }

  //delete a task inside a task list
  deleteATaskInsideTaskList(taskListId: string, taskId: string): Observable<TaskModel> {
    return this.apiConfigService.deleteTask(`tasklists/${taskListId}/tasks/${taskId}`);
  }

  updateTaskStatus(taskListId: string, taskObject: TaskModel) {
    const updateData = { completed: !taskObject.completed };
    return this.apiConfigService.patch(`tasklists/${taskListId}/tasks/${taskObject._id}`, updateData)
  }
}
