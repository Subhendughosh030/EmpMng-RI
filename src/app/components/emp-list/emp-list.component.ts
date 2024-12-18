import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  OnInit,
  signal,
  Signal
} from '@angular/core';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/utility/model';



@Component({
  selector: 'app-emp-list',
  standalone: true,
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css'],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ]
})
export class EmpListComponent implements OnInit {

  faPlus = faPlus;
  pastEmployees: Signal<Employee[]> = signal([]);
  currentEmployees: Signal<Employee[]> = signal([]);

  constructor(
    public service: EmployeeService
  ) {}

  ngOnInit(): void {
    this.currentEmployees = computed(() =>
      this.service.employees().filter(
        emp => emp.fromDate && !emp.toDate
      )
    );

    this.pastEmployees = computed(() =>
      this.service.employees().filter(
        emp => emp.fromDate && emp.toDate
      )
    );
    
    this.service.fetchAllEmployees();
  }
}
