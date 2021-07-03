import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Day } from 'src/app/models/day.model';
import { Reminder } from 'src/app/models/reminder.model';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-reminder-modal',
  templateUrl: './reminder-modal.component.html',
  styleUrls: ['./reminder-modal.component.scss']
})
export class ReminderModalComponent implements OnInit {

  @Input() day: Day;
  @Input() reminderId: string;
  reminder: Reminder = new Reminder(2021, 7, 3, '', '', '');// corregir
  isLoading = false;

  constructor(
    private calendarService: CalendarService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.reminderId ? this.get(this.reminderId) : null ;
  }

  get(reminderId: string) {
    this.calendarService.get(reminderId)
      .subscribe((data: Reminder) => {
        // console.log(data);
        this.reminder = data;
      },
      error => this.toastr.error(error, 'Error getting reminder'));
  }

  onSubmit() {
    this.isLoading = true;
    // this.editing ? this.onUpdate() : this.onCreate();
  }

}
