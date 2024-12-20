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

  @Input() date?: Date;
  @Input() minDate?: Date;
  @Input() for: 'fromDate' | 'toDate' = 'fromDate';
  @Output() dateChange = new EventEmitter<Date>();
  
  faCalendar = faCalendar;

  selectedDate?: NgbDateStruct;
  displayDate: string = 'Today';
  applyingDateStr: string = 'Today';

  constructor(private readonly modalService: NgbModal) { }
  
  private getFutureDate(dayOfWeek: number): NgbDateStruct {
    const today = new Date();
    const currentDay = today.getDay();
    const offset = (dayOfWeek + 7 - currentDay) % 7 || 7;
    today.setDate(today.getDate() + offset);
    const futureDate = this.parseDateToNgbDateStruct(today);
    if (!futureDate) {
      throw new Error('Failed to parse future date');
    }
    return futureDate;
  }

  private formatDate(date?: NgbDateStruct): string {
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

  private parseNgbDateStructToDate(dateStruct?: NgbDateStruct): Date | undefined {
    if (dateStruct)
      return new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day);
    return undefined;
  }

  private parseDateToNgbDateStruct(date?: Date): NgbDateStruct | undefined {
    if (date) {
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      };
    }
    return undefined;
  }

  ngOnInit(): void {
    if (this.date)
      this.selectedDate = this.parseDateToNgbDateStruct(this.date);
    this.updateDisplayDate();
    this.applyingDateStr = this.displayDate;
  }

  openModal(content: any): void {
    let modalRef = this.modalService.open(content, { centered: true });
    modalRef.result.then((dateStruct: NgbDateStruct | null) => {
      if (dateStruct)
        this.dateChange.emit(this.parseNgbDateStructToDate(dateStruct));
      else
        this.dateChange.emit();
    }, console.log);
  }

  updateDisplayDate(): void {
    this.displayDate = this.formatDate(this.selectedDate);
  }

  selectToday(): void {
    const today = new Date();
    this.selectedDate = this.parseDateToNgbDateStruct(today);
    this.updateDisplayDate();
  }

  selectNextDay(dayOfWeek: number): void {
    this.selectedDate = this.getFutureDate(dayOfWeek);
    this.updateDisplayDate();
  }

  selectAfterOneWeek(): void {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    this.selectedDate = this.parseDateToNgbDateStruct(today);
    this.updateDisplayDate();
  }

  selectNoDate(): void {
    this.selectedDate = undefined;
    this.updateDisplayDate();
  }

  getMinDate(): NgbDateStruct {
    if (this.minDate)
      return this.parseDateToNgbDateStruct(this.minDate)!;
    return { year: 1900, month: 1, day: 1 };
  }
}