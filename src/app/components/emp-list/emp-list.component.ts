import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faPlus } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-emp-list',
  standalone: true,
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css'],
  imports: [FontAwesomeModule, RouterModule]
})
export class EmpListComponent {
  faPlus = faPlus;

  
}
