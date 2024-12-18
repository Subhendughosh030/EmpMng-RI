import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Employee } from 'src/app/utility/model';



@Component({
  standalone: true,
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css'],
  imports: [
    CommonModule
  ]
})
export class EmpListComponent {
  @Input() employee!: Employee;
}