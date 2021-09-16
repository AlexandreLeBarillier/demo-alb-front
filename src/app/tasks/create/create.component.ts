import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/models/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createTaskForm: FormGroup = this.formBuilder.group({
    label: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TasksService,
    private router: Router) {
  }

  ngOnInit(): void {

  }

  submit() {
    let task = new Task(this.createTaskForm.value);
    this.taskService.put(task).subscribe((id: number) => {
      if (id) {
        this.router.navigate(['tasks']);
      } else {
        console.log("Erreur de création de la tâche")
      }
    }
    );
  }

}
