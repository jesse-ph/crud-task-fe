import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  taskListId = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.taskListId = params.taskListId;
    });
  }

  addNewTask(title: string) {
    if(!title) {
      alert('Title should not be empty!');
      return;
    }

    this.taskService.createTaskInsideATaskList(this.taskListId, title).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    });
    console.log(title);
  }
}
