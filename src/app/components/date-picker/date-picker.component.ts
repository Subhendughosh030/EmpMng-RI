import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import {
  NgbDatepickerModule,
  NgbDateStruct,
  NgbModal,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';



@Component({
  standalone: true,
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  imports: [
    FormsModule,
    CommonModule,
    NgbModalModule,
    FontAwesomeModule,
    NgbDatepickerModule
  ]
})
export class DatePickerComponent implements OnInit {

  @Input() for: 'fromDate' | 'toDate' = 'fromDate';
  @Output() dateChange = new EventEmitter<Date>();
  
  faCalendar = faCalendar;
  selectedDate!: NgbDateStruct | null;
  displayDate: string = 'Today';
  applyingDate: string = 'Today';

  constructor(private readonly modalService: NgbModal) { }
  
  private getFutureDate(dayOfWeek: number): NgbDateStruct {
    const today = new Date();
    const currentDay = today.getDay();
    const offset = (dayOfWeek + 7 - currentDay) % 7 || 7;
    today.setDate(today.getDate() + offset);
    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
  }

  private formatDate(date: NgbDateStruct | null): string {
    if (!date) return 'No date';
    const currentDate = new Date();
    const selected = new Date(date.year, date.month - 1, date.day);

    if (
      currentDate.getDate() === selected.getDate() &&
      currentDate.getMonth() === selected.getMonth() &&
      currentDate.getFullYear() === selected.getFullYear()
    ) {
      return 'Today';
    }

    return `${date.day} ${new Intl.DateTimeFormat('en', {
      month: 'short',
    }).format(new Date(date.year, date.month - 1))} ${date.year}`;
  }

  ngOnInit(): void {
    if (this.applyingDate === 'Today') {
      const today = new Date();
      this.selectedDate = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
      };
      this.dateChange.emit(new Date(this.selectedDate.year, this.selectedDate.month - 1, this.selectedDate.day));
    }
  }

  openModal(content: any): void {
    let modalRef = this.modalService.open(content, { size: 'sm', centered: true });
    modalRef.result.then((dateStruct: NgbDateStruct | null) => {
      if (dateStruct)
        this.dateChange.emit(new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day));
      else
        this.dateChange.emit();
    }, console.log);
  }

  updateDisplayDate(): void {
    this.displayDate = this.formatDate(this.selectedDate);
  }

  selectToday(): void {
    const today = new Date();
    this.selectedDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
    this.updateDisplayDate();
  }

  selectNextDay(dayOfWeek: number): void {
    this.selectedDate = this.getFutureDate(dayOfWeek);
    this.updateDisplayDate();
  }

  selectAfterOneWeek(): void {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    this.selectedDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
    this.updateDisplayDate();
  }

  selectNoDate(): void {
    this.selectedDate = null;
    this.updateDisplayDate();
  }
}