import { Component, OnInit } from '@angular/core';

import TaskListModel from '../../models/taskListModel';
import TaskModel from '../../models/taskModel';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-task-screen',
  templateUrl: './task-screen.component.html',
  styleUrls: ['./task-screen.component.scss']
})
export class TaskScreenComponent implements OnInit {

  tasksLists: TaskListModel[] = [];
  tasks: TaskModel[] = [];
  taskListId = '';

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.taskService.getAllTaskLists().subscribe(
      (allTaskLists: TaskListModel[]) => {
        this.tasksLists = allTaskLists;
        // this.router.navigate(['task-list', this.tasksLists[0]['_id'] ]);
      }
    );

    this.activatedRoute.params.subscribe((params: Params) => {
      this.taskListId = params.taskListId;
      if(this.taskListId) {
        this.taskService.getAllTasksForATaskList(this.taskListId).subscribe(
          (tasks: TaskModel[]) => this.tasks = tasks
        );
      }
    });
  }

  onTaskClick(task: TaskModel) {
    this.taskService.updateTaskStatus(this.taskListId, task).subscribe(
      () => task.completed = !task.completed
    );
  }

  deleteTask(task: TaskModel) {
    this.taskService.deleteATaskInsideTaskList(this.taskListId, task._id)
      .subscribe((taskDeleted: TaskModel) => {
        this.tasks = this.tasks.filter(task => task._id != taskDeleted._id);
      });
  }

  deleteTaskList(taskList: TaskListModel) {
    this.taskService.deleteTaskList(taskList._id)
      .subscribe(() => {
        this.tasksLists = this.tasksLists.filter(tasklist => tasklist._id != taskList._id);
      });
  }

  addNewTask() {
    if(this.taskListId) {
      // route the user to add task for the selected task-list
      this.router.navigate(['new-task'], { relativeTo: this.activatedRoute });
    } else {
      alert("Please select a task list!");
    }
  }

}
