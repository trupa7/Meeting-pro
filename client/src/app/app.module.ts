import { FormsModule } from "@angular/forms";
import { OrderByDoneAndDatePipe } from "./order-by-done-and-date.pipe";
import { MeetingsService } from "./meetings.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { TaskService } from "./task.service";
import { AppComponent } from "./app.component";
import { CreateMeetingComponent } from "./meetings/create-meeting/create-meeting.component";
import { HttpClient } from "selenium-webdriver/http";
import { ListMeetingComponent } from "./meetings/list-meeting/list-meeting.component";
import { AppRoutingModule } from ".//app-routing.module";
import { GetTaskComponent } from "./task/listTask/get-task/get-task.component";
import { Ng2FilterPipeModule } from "ng2-filter-pipe";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CreateMeetingComponent,
    ListMeetingComponent,
    GetTaskComponent,

    OrderByDoneAndDatePipe
  ],

  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    Ng2FilterPipeModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule
  ],
  providers: [MeetingsService, TaskService],

  bootstrap: [AppComponent]
})
export class AppModule {}
