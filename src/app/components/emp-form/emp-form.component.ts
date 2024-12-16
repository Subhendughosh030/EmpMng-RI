import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-emp-form',
  standalone: true,
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.css']
})
export class EmpFormComponent {

  mode: 'add' | 'edit' = 'add';
  employeeData: any;

  constructor(
    private readonly route: ActivatedRoute
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
}
