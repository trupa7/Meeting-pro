import { Component, OnInit, ViewChild } from "@angular/core";
import { Http } from "@angular/http";
import { TaskService } from "./../../../task.service";
import { Task } from "./../../../task";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs/Rx";
@Component({
  selector: "app-get-task",
  templateUrl: "./get-task.component.html",
  styleUrls: ["./get-task.component.css"]
})
export class GetTaskComponent implements OnInit {
  tasks: Array<Task>;
  constructor(private taskservice: TaskService) {}
  private model = new Task("", "", "", "", "");
  submitTask() {
    // Variable to hold a reference of addComment/updateComment
    let taskOperation: Observable<Task[]>;
    this.taskservice.addTask(this.model).subscribe(err => {
      // Log errors if any
      console.log(err);
    });
  }

  // Get all comments
  loadTasks() {
    this.taskservice.getTask().subscribe(
      tasks => (this.tasks = tasks), //Bind to view
      err => {
        // Log errors if any
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.loadTasks();
  }
}
