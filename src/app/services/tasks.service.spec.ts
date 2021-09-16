import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Task } from '../models/task.model';

import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TasksService);
  });

  let httpTestingController: HttpTestingController;
  beforeEach(() => httpTestingController = TestBed.inject(HttpTestingController));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call API GET /tasks', () => {
    let tasks: Task[] = [];
    service.getAll().subscribe((_tasks) => {
      tasks = _tasks
    })

    const req = httpTestingController.expectOne('http://localhost:8080/tasks/all');
    req.flush([{
      "id": 1,
      "label": "ma description",
      "status": "to_do"
    }])

    expect(tasks.length).toBe(1);
    expect(tasks[0].status).toBe("to_do");
  });

  it('should call API GET /tasks/{id}', () => {
    let task: Task = new Task();
    service.getById(1).subscribe((_task) => {
      task = _task
    })

    const req = httpTestingController.expectOne('http://localhost:8080/tasks/1');
    req.flush({
      "id": 1,
      "label": "ma description",
      "status": "to_do"
    })

    expect(task.status).toBe("to_do");
  });

  it('should call API GET /tasks?status=to_do', () => {
    let tasks: Task[] = [];
    service.getByStatus('to_do').subscribe((_tasks) => {
      tasks = _tasks
    })

    const req = httpTestingController.expectOne('http://localhost:8080/tasks?status=to_do');
    req.flush([{
      "id": 1,
      "label": "ma description",
      "status": "to_do"
    }])

    expect(tasks.length).toBe(1);
    expect(tasks[0].status).toBe("to_do");
  });

  it('should call API GET /tasks?status=to_do', () => {
    let task = new Task({
      "label": "ma description",
      "status": "to_do"
    });
    let id: number = -1;
    
    service.put(task).subscribe((_id) => {
      id = _id
    })

    const req = httpTestingController.expectOne('http://localhost:8080/tasks');
    req.flush(1)

    expect(id).toBe(1);
  });

  it('should call API POST /tasks/{id}', () => {
    let task = new Task({
      "id":1,
      "label": "ma description",
      "status": "to_do"
    });
    let id: number = -1;
    
    service.post(task.id, task).subscribe(()=>{});

    const req = httpTestingController.expectOne('http://localhost:8080/tasks/1');

  });
});
