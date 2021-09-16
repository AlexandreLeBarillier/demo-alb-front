import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Task } from '../models/task.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private resourceUrl: string = environment.apiUrl + "/tasks";

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Task> {
    let getByIdUrl = this.resourceUrl + "/" + id;
    return this.http.get<Task>(getByIdUrl);
  }

  getAll(): Observable<Task[]> {
    let getAllUrl = this.resourceUrl + "/all";
    return this.http.get<Task[]>(getAllUrl);
  }

  getByStatus(status: string) {
    let getByStatus = this.resourceUrl;
    let params = new HttpParams().set("status", status);
    return this.http.get<Task[]>(getByStatus, { params: params });
  }

  put(task: Task): Observable<number> {
    return this.http.put<number>(this.resourceUrl, task);
  }

  post(id: number, task: Task) {
    let postUrl = this.resourceUrl + "/" + id;
    return this.http.post(postUrl, task);
  }
}
