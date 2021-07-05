import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Day } from 'src/app/models/day.model';
import { Reminder } from 'src/app/models/reminder.model';
import { Globals } from 'src/app/shared/globals';
import { ReminderModalComponent } from '../reminder-modal/reminder-modal.component';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  @Input() day: Day;

  constructor(
    private globals: Globals,
    private modalService: NgbModal,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    // console.log('day', this.day);

  }

  openReminder(reminderId: Reminder) {
    const modalRef = this.modalService.open(ReminderModalComponent, this.globals.mdModal);
    modalRef.componentInstance.reminderId = reminderId;
    modalRef.closed.subscribe((reminderUpdated: Reminder) => {
      console.log('reminderUpdated', reminderUpdated);
    })
  }

}
