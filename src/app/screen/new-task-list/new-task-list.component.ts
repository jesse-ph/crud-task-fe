import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../task.service';
import TaskListModel from 'src/app/models/taskListModel';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss']
})
export class NewTaskListComponent {
  constructor(
    private router: Router,
    private taskService: TaskService
  ) { }

  addNewTaskList(title: string) {
    if(!title) {
      alert('Title should not be empty!');
      return;
    }

    this.taskService.createTaskList(title).subscribe((data: TaskListModel) => {
      this.router.navigate(['task-list', data._id]);
    });
    console.log(title);
  }
}
