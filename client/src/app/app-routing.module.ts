import { CreateMeetingComponent } from './meetings/create-meeting/create-meeting.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { GetTaskComponent } from "./task/listTask/get-task/get-task.component";
import { ListMeetingComponent } from "./meetings/list-meeting/list-meeting.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "meeting", component: ListMeetingComponent },
  { path: "meeting/create", component: CreateMeetingComponent },
  { path: "task", component: GetTaskComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
  declarations: []
})
export class AppRoutingModule {}
