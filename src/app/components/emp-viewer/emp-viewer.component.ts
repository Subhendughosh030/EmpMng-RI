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

import { EmpListComponent } from '../emp-list/emp-list.component';

import { EmployeeService } from 'src/app/services/employee.service';

import { Employee } from 'src/app/utility/model';



@Component({
  standalone: true,
  selector: 'app-emp-viewer',
  templateUrl: './emp-viewer.component.html',
  styleUrls: ['./emp-viewer.component.css'],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,

    EmpListComponent
  ]
})
export class EmpViewerComponent implements OnInit {

  faPlus = faPlus;
  pastEmployees: Signal<Employee[]> = signal([]);
  currentEmployees: Signal<Employee[]> = signal([]);

  constructor(private readonly service: EmployeeService) {}

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