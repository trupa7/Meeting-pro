import { OrderByDoneAndDatePipe } from './../../order-by-done-and-date.pipe';
import { MeetingsService } from './../../meetings.service';
import { Component, OnInit,Pipe,Inject,forwardRef,Injectable, PipeTransform  } from '@angular/core';
import { Http } from '@angular/http';    

import { NgModel } from '@angular/forms';
declare let jsPDF;

@Component({
  selector: "app-list-meeting",
  templateUrl: "./list-meeting.component.html",
  styleUrls: ["./list-meeting.component.css"]
})
export class ListMeetingComponent implements OnInit {
  userFilter: any = { m_participant: 'jmsheth53@gmail.com' };
  meetings: any[];
  term:any;
  today: number = Date.now();
  
  constructor(  private meetingservice:MeetingsService) { }
  update(value){
    this.term=value;
  }
  
    loadMeetings(){
      
    // Get all comments
    this.meetingservice.getMeetings()
    .subscribe(
      meetings =>{ this.meetings = meetings;
        this.meetings.sort((a, b) => new Date(a.from_date).getTime() - new Date(b.from_date).getTime());
         },
      //Bind to view
         err => {
             // Log errors if any
             console.log(err);
         }
        );      
 
      }  
  
      deleteMeeting(id:string) {
        // Call removeComment() from CommentService to delete comment
        this.meetingservice.removeMeeting(id).subscribe(
          meetings =>{ this.meetings = meetings;
            this.meetings.sort((a, b) => new Date(a.from_date).getTime() - new Date(b.from_date).getTime());
             },
                                err => {
                                    // Log errors if any
                                    console.log(err);
                                });

                                
    }

    convert(){
      var item = {
        "Name" : "XYZ",
        "Age" : "22",
        "Gender" : "Male"
      };
      var doc = new jsPDF();
      var col = ["Details", "Values"];
      var rows = [];
  
      for(var key in item){
          var temp = [key, item[key]];
          rows.push(temp);
      }
  
      doc.autoTable(col, rows);
  
      doc.save('Test.pdf');
    }
  ngOnInit() {
    //load meetings
    this.loadMeetings()
    
  }

}
