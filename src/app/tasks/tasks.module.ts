import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule} from '@angular/material/input'
import { MatSelectModule} from '@angular/material/select'
import { MatCardModule} from '@angular/material/card'
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TasksModule { }
