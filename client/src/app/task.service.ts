import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Task } from "./task";
// Import RxJs required methods
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
@Injectable()
export class TaskService {
  private url = "http://127.0.0.1:4000/api/tasks";
  constructor(private http: Http) {}
  getTask(): Observable<Task[]> {
    return this.http
      .get(this.url)
      .map((res: Response) => res.json())
      .catch((error: any) =>
        Observable.throw(error.json().error || "Server error")
      );
  }
  addTask(body: Object): Observable<Task[]> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ "Content-Type": "application/json" }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http
      .post(this.url, body, options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) =>
        Observable.throw(error.json().error || "Server error")
      ); //...errors if any
  }
}
