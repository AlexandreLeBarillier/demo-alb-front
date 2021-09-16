import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

import { ListComponent } from './list.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterModule } from '@angular/router';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let taskService: TasksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService, RouterTestingModule],
      declarations: [ListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    taskService = fixture.debugElement.injector.get(TasksService); 
    component = new ListComponent(taskService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service get without filter', () => {
    const getAllSpy = spyOn(taskService, 'getAll').and.returnValue(of([]));
    component.filter(undefined);
    expect(getAllSpy).toHaveBeenCalledTimes(1);
  })

  it('should call service get with filters', () => {
    const getByStatusSpy = spyOn(taskService, 'getByStatus').and.returnValue(of([]));
    component.filter({ 'value': 'to_do' });
    expect(getByStatusSpy).toHaveBeenCalledWith('to_do');
  })

  it('should call service post ', () => {
    const postSpy = spyOn(taskService, 'post').and.returnValue(of());
    let task = new Task();
    task.id = 1;
    task.label = 'ma description';
    task.status = 'to_do';
    component.update(undefined, task);
    expect(postSpy).toHaveBeenCalledOnceWith(task.id, task);
  })
});
