import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskScreenComponent } from './screen/task-screen/task-screen.component';

const routes: Routes = [
  { path: '', component: TaskScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
