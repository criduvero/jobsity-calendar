import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'
import { ToastrService } from 'ngx-toastr';
import { Day } from 'src/app/models/day.model';
import { Reminder } from 'src/app/models/reminder.model';
import { CalendarService } from 'src/app/services/calendar.service';
import { Globals } from 'src/app/shared/globals';
import { ReminderModalComponent } from '../reminder-modal/reminder-modal.component';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

  weekDays: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  year: number;
  month: number;
  days: any[];


  constructor(
    private globals: Globals,
    private calendarService: CalendarService,
    private modalService: NgbModal,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.year = moment().year();
    this.month = moment().month(); // get month 0-11
    console.log(this.year);
    console.log(this.month + 1);

    this.getDays(this.year, this.month);
  }

  getDays(year: number, month: number) {
    const daysInMonthQty = moment().year(year).month(month).daysInMonth();
    const monthDays = [];

    for (let i = 1; i <= daysInMonthQty; i++) {
      monthDays.push({
        dayNumber: i,
        year,
        month: month + 1,
        dateFormatted: moment().year(year).month(month).date(i).format('YYYY-MM-DD'),
        date: moment().year(year).month(month).date(i)
      });
    }

    const previousMonthDays = this.getPreviousMonthDays(year, month);
    const nextMonthDays = this.getNextMonthDays(year, month);

    this.days = [
      ...previousMonthDays,
      ...monthDays,
      ...nextMonthDays,
    ];

    this.getReminders(year, month + 1); // (real month number)
  }

  getReminders(year:number, month: number) {
    const params = { year, month };
    this.calendarService.getAll(params)
      .subscribe((data: Reminder[]) => {
        // console.log(data);
        this.days.forEach(day => {
          const reminders = data.filter((reminder: Reminder) => {
            if (reminder.date.year == day.year && reminder.date.month == day.month && reminder.date.day == day.dayNumber) {
              return reminder;
            }
          })

          day = {... day, reminders};
          console.log('day with reminders', day);

        });
      },
      error => this.toastr.error(error, 'Error getting reminder'));
  }

  getPreviousMonthDays(year: number, month: number) {
    const previousMonthDays = [];
    const currentMonthFirstDay = moment().year(year).month(month).startOf('month');
    console.log('currentMonthFirstDay', currentMonthFirstDay);

    if(currentMonthFirstDay.weekday() === 0){
      return previousMonthDays;
    }

    const previousMonthFirstDay = moment(currentMonthFirstDay).subtract(1,'month').endOf('month')
    console.log('previousMonthFirstDay', previousMonthFirstDay);

    let previousMonthDay = previousMonthFirstDay;

    while (previousMonthDay.weekday() > 0) {
      previousMonthDays.push({
        dayNumber: previousMonthDay.date(),
        dateFormatted: previousMonthDay.format('YYYY-MM-DD') ,
        date: previousMonthDay,
        previousMonth: true
      });

      previousMonthDay.subtract(1,'day');
    }

    previousMonthDays.push({
      dayNumber: previousMonthDay.date(),
      dateFormatted: previousMonthDay.format('YYYY-MM-DD'),
      date: previousMonthDay,
      previousMonth: true
    });

    return previousMonthDays.reverse();

  }

  getNextMonthDays(year: number, month: number) {
    const nextMonthDays = [];
    const currentMonthLastDay = moment().year(year).month(month).endOf('month');
    console.log('currentMonthLastDay', currentMonthLastDay);

    if(currentMonthLastDay.weekday() === 6){
      return nextMonthDays;
    }

    const nextMonthLastDay = moment(currentMonthLastDay).add(1,'month').startOf('month')
    console.log('nextMonthLastDay', nextMonthLastDay);

    let nextMonthDay = nextMonthLastDay;

    while (nextMonthDay.weekday() < 6) {
      nextMonthDays.push({
        dayNumber: nextMonthDay.date(),
        dateFormatted: nextMonthDay.format('YYYY-MM-DD') ,
        date: nextMonthDay,
        nextMonth: true
      });

      nextMonthDay.add(1,'day');
    }

    nextMonthDays.push({
      dayNumber: nextMonthDay.date(),
      dateFormatted: nextMonthDay.format('YYYY-MM-DD'),
      date: nextMonthDay,
      nextMonth: true
    });

    return nextMonthDays;
  }

  openModal(day: Day, reminderId?: number) {
    console.log(`openModal for day: ${day.dayNumber}, reminderId: ${reminderId}`);
    const modalRef = this.modalService.open(ReminderModalComponent, this.globals.mdModal);
    modalRef.componentInstance.day = day;
    modalRef.componentInstance.reminderId = reminderId;
  }


}
