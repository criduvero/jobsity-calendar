import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Day } from 'src/app/models/day.model';
import { Reminder } from 'src/app/models/reminder.model';
import { CalendarService } from 'src/app/services/calendar.service';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-reminder-modal',
  templateUrl: './reminder-modal.component.html',
  styleUrls: ['./reminder-modal.component.scss']
})
export class ReminderModalComponent implements OnInit {

  @Input() day: Day;
  @Input() reminderId: string;
  reminder: Reminder;
  isLoading = false;
  faCalendarAlt = faCalendarAlt;
  fieldsValidationError: boolean;

  constructor(
    private calendarService: CalendarService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.day);
    if (this.reminderId) { // reminder update process
      this.reminder = new Reminder('', {year: null, month: null, day: null}, {hour: null, minute: null}, null);
      this.getReminder(this.reminderId);
    } else {
      this.reminder = new Reminder('', {year: this.day.year, month: this.day.month, day: this.day.dayNumber}, {hour: null, minute: null}, '#2f75b5');
    }
  }

  getReminder(reminderId: string) {
    this.calendarService.getReminder(reminderId)
      .subscribe((data: Reminder) => {
        // console.log(data);
        this.reminder = data;
      },
      error => this.toastr.error(error, 'Error getting reminder'));
  }

  submitForm() {
    let validationOK = this.validateFields();
    if (validationOK) {
      this.isLoading = true;
      this.reminderId ? this.onUpdate() : this.onCreate();
    }
  }

  validateFields(): boolean {
    if (!this.reminder.title.length) {
      this.showValidationAlert();
      return false;
    }

    if (!(this.reminder.date.year && this.reminder.date.month && this.reminder.date.day)) {
      this.showValidationAlert();
      return false;
    }

    if (this.reminder.time == null) {
      this.showValidationAlert();
      return false;
    }

    return true;
  }

  showValidationAlert() {
    this.fieldsValidationError = true;
    setTimeout(() => {
      this.fieldsValidationError = false;
    }, 4000);
  }

  onCreate() {
    this.calendarService.createReminder(this.reminder)
      .subscribe(
        (reminderCreated: Reminder) => {
          this.toastr.success('The reminder has been successfully created', 'Successful operation');
          this.isLoading = false;
          this.activeModal.close(reminderCreated);
        },
        error => {
          this.toastr.error(error, 'Failed operation');
          this.isLoading = false;
        });
  }

  onUpdate() {
    this.calendarService.updateReminder(this.reminder)
      .subscribe(
        (reminderUpdated: Reminder) => {
          this.toastr.success('The reminder has been successfully updated', 'Successful operation');
          this.isLoading = false;
          this.activeModal.close(reminderUpdated);
          },
        error => {
          this.toastr.error(error, 'Operación fallida');
          this.isLoading = false;
        });
  }

  prueba(e) {
    console.log(e);

  }

}
