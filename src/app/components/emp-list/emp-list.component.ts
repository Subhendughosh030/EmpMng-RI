import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeService } from 'src/app/services/employee.service';

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

  constructor(
    public readonly router: Router,
    public readonly service: EmployeeService
  ) {}
  
}