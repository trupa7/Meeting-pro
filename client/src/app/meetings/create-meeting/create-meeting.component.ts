

import { NgForm }    from '@angular/forms';
import {Observable} from 'rxjs/Rx';

import { Meeting } from "./../../meeting";

import { OrderByDoneAndDatePipe } from "./../../order-by-done-and-date.pipe";
import { MeetingsService } from "./../../meetings.service";
import {
  Component,
  OnInit,
  Pipe,
  Inject,
  forwardRef,
  Injectable,
  PipeTransform
} from "@angular/core";
import { Http } from "@angular/http";

import { NgModel } from "@angular/forms";
4
@Component({
  selector: "app-create-meeting",
  templateUrl: "./create-meeting.component.html",
  styleUrls: ["./create-meeting.component.css"]
})
export class CreateMeetingComponent implements OnInit {

  userFilter: any = { m_participant: "jmsheth53@gmail.com" };
  meetings: any[];
  today: number = Date.now();
  constructor(private meetingservice: MeetingsService) {}
  loadMeetings() {
    // Get all comments
    this.meetingservice.getMeetings().subscribe(
      meetings => {
        this.meetings = meetings;
        this.meetings.sort(
          (a, b) =>
            new Date(a.to_date).getTime() - new Date(b.to_date).getTime()
        );
      },
      //Bind to view
      err => {
        // Log errors if any
        console.log(err);
      }
    );
  }

  ngOnInit() {
    //load meetings
    this.loadMeetings();

  }
}
