import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterModule
} from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendar,
  faTrashAlt,
  faUser
} from '@fortawesome/free-regular-svg-icons';
import { faArrowRight, faBriefcase } from '@fortawesome/free-solid-svg-icons';

import { DatePickerComponent } from "../date-picker/date-picker.component";

import { EmployeeService } from 'src/app/services/employee.service';

import { JobRoles } from 'src/app/utility/content';
import { Employee } from 'src/app/utility/model';



@Component({
  selector: 'app-emp-form',
  standalone: true,
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.css'],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    DatePickerComponent
]
})
export class EmpFormComponent {

  faUser = faUser;
  faTrashAlt = faTrashAlt;
  faCalendar = faCalendar;
  faBriefcase = faBriefcase;
  faArrowRight = faArrowRight;

  employeeData: Employee = {
    fromDate: new Date()
  };
  roles: string[] = JobRoles;
  mode: 'add' | 'edit' = 'add';

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly service: EmployeeService
  ) {}

  ngOnInit(): void {
    const currentRoute = this.route.snapshot.routeConfig?.path;

    if (currentRoute === 'add') {
      this.mode = 'add';
    } else if (currentRoute === 'edit') {
      this.mode = 'edit';
      this.employeeData = history.state.data;
    }
  }

  async saveEmp(): Promise<void> {
    try {
      if(this.mode === 'add')
        await this.service.addEmployee(this.employeeData);
      else
        await this.service.updateEmployee(this.employeeData);
      this.router.navigateByUrl('/');
    }
    catch(err){
      console.log(err);
      alert(err);
    }
  }

  deleteEmp(): void {
    if(!this.employeeData.id) return;
    this.service.deleteEmployee(this.employeeData.id).then(() => {
      this.router.navigateByUrl('/');
    }, err => {
      console.log(err);
      alert(err);
    });
  }
}
