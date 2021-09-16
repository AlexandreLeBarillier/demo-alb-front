import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CreateComponent } from './create.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TasksService } from 'src/app/services/tasks.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let taskService: TasksService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
      ],
      providers: [TasksService],
      declarations: [CreateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    taskService = fixture.debugElement.injector.get(TasksService);
    router = fixture.debugElement.injector.get(Router); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submitting valid form and HTTP 200', () => {
    component.createTaskForm.controls['label'].setValue("ma nouvelle tâche");
    component.createTaskForm.controls['status'].setValue("to_do");

    const putSpy = spyOn(taskService, 'put').and.returnValue(of(1));
    const routerSpy = spyOn(router, 'navigate');

    component.submit();
    expect(putSpy).toHaveBeenCalledTimes(1);
    expect(routerSpy).toHaveBeenCalledOnceWith(['tasks']);
  });

  it('submitting valid form and HTTP error', () => {
    component.createTaskForm.controls['label'].setValue("ma nouvelle tâche");
    component.createTaskForm.controls['status'].setValue("to_do");

    const putSpy = spyOn(taskService, 'put').and.returnValue(of());

    component.submit();
    expect(putSpy).toHaveBeenCalledTimes(1);
  });

  it('check form validity', () => {
    expect(component.createTaskForm.valid).toBeFalsy;
    component.createTaskForm.controls['label'].setValue("ma nouvelle tâche");
    component.createTaskForm.controls['status'].setValue("to_do");
    expect(component.createTaskForm.valid).toBeTruthy;
  });

});
