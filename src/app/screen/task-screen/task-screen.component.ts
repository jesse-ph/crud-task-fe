import { Component, OnInit } from '@angular/core';

import TaskListModel from '../../models/taskListModel';
import TaskModel from '../../models/taskModel';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-screen',
  templateUrl: './task-screen.component.html',
  styleUrls: ['./task-screen.component.scss']
})
export class TaskScreenComponent implements OnInit {

  tasksLists: TaskListModel[] = [];
  tasks: TaskModel[] = [];

  constructor(private taskService: TaskService) { }
  ngOnInit(): void {
    this.taskService.getAllTaskLists()
        .subscribe((allTaskLists: TaskListModel[]) => {
          this.tasksLists = allTaskLists;
        });
  }

}
