import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private taskService: TasksService;
  statusControl: FormControl = new FormControl();
  displayedColumns: string[] = ['id', 'label', 'status'];
  tasks: Task[] = [];

  constructor(taskService: TasksService) {
    this.taskService = taskService;
    //this.tasks = [new Task(1, "Créer une route XXXX", "to-do")];
  }

  ngOnInit(): void {
    this.filter(undefined);
  }

  filter(event: any): void {
    if (event == undefined || event.value == "") {
      this.taskService.getAll().subscribe((tasks: Task[]) => { this.tasks = tasks });
    } else {
      this.taskService.getByStatus(event.value).subscribe((tasks: Task[]) => { this.tasks = tasks });
    }
  }

  update(event:any, task: Task): void{
    this.taskService.post(task.id, task);
  }
}
