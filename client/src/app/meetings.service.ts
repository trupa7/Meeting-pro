import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Meeting } from "./meeting";
// Import RxJs required methods
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class MeetingsService {
  constructor(private http: Http) {}
  private meetingUrl = "http://127.0.0.1:4000/api/meetings/"; // URL to web api
  /** GET meetings from the server */
  getMeetings(): Observable<Meeting[]> {
    // ...using get request
    return (
      this.http
        .get(this.meetingUrl)
        // ...and calling .json() on the response to return data
        .map((res: Response) => res.json())
        //...errors if any
        .catch((error: any) =>
          Observable.throw(error.json().error || "Server error")
        )
    );
  }


      // Delete a Meeting
  removeMeeting (id:string): Observable<Meeting[]> {
        return this.http.delete(`${this.meetingUrl}/${id}`) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
    
     // Add a new meeting
  addMeeting (body: Object): Observable<Meeting[]> {
      let bodyString = JSON.stringify(body); // Stringify payload
      let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options       = new RequestOptions({ headers: headers }); // Create a request option

      return this.http.post(this.meetingUrl, body, options) // ...using post request
                       .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                       .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  } 


}
