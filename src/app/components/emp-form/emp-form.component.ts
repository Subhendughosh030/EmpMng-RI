import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar, faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight, faBriefcase } from '@fortawesome/free-solid-svg-icons';

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
    FontAwesomeModule
  ]
})
export class EmpFormComponent {

  faUser = faUser;
  faCalendar = faCalendar;
  faBriefcase = faBriefcase;
  faArrowRight = faArrowRight;

  mode: 'add' | 'edit' = 'add';
  employeeData: Employee = {};
  roles: string[] = JobRoles;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly service: EmployeeService
  ) {}

  ngOnInit() {
    const currentRoute = this.route.snapshot.routeConfig?.path;

    if (currentRoute === 'add') {
      this.mode = 'add';
    } else if (currentRoute === 'edit') {
      this.mode = 'edit';
      this.employeeData = history.state.data;
    }
  }

  async saveEmp() {
    try {
      if(this.mode === 'add')
        await this.service.addEmployee(this.employeeData);
      else
        await this.service.updateEmployee(this.employeeData);
      this.router.navigate(['/']);
    }
    catch(e){
      console.log(e)
      alert(e);
    }
  }
}
