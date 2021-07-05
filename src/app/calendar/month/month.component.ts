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
  days: Day[];


  constructor(
    private globals: Globals,
    private calendarService: CalendarService,
    private modalService: NgbModal,
    private toastr: ToastrService) { }

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
        weekDay: moment().year(year).month(month).date(i).weekday(),
        year,
        month: month + 1,
        currentMonth: true,
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
        weekDay: previousMonthDay.weekday(),
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
        weekDay: nextMonthDay.weekday(),
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

  getReminders(year:number, month: number) {
    const params = { year, month };
    this.calendarService.getAllReminders(params)
      .subscribe((data: Reminder[]) => {
        console.log(data);
        this.addRemindersToDays(data);
      },
      error => this.toastr.error(error, 'Error getting reminder'));
  }

  addRemindersToDays (reminders: Reminder[]) {
    this.days.forEach(day => {
      day.reminders = reminders.filter((reminder: Reminder) => {
        if (reminder.date.year == day.year && reminder.date.month == day.month && reminder.date.day == day.dayNumber) {
          return reminder;
        }
      });
    });
  }

  createReminder(day: Day) {
    if (day.currentMonth) {
      console.log(`openModal for day: ${day.dayNumber}`);
      const modalRef = this.modalService.open(ReminderModalComponent, this.globals.mdModal);
      modalRef.componentInstance.day = day;
      modalRef.closed.subscribe((reminderCreated: Reminder) => {
        this.addReminderToDay(reminderCreated);
      })
    }
  }

  addReminderToDay(reminder: Reminder) {
    console.log('addReminderToDay');

    this.days.map((day) => {
      if (day.year == reminder.date.year && day.month == reminder.date.month && day.dayNumber == reminder.date.day) {
        day.reminders.push(reminder);
      }
      return day;
    })
  }

  handleReminderUpdated(reminderUpdated: Reminder, day: Day, dayIndex: number) {
    console.log('handleReminderUpdated');
    if (day.year == reminderUpdated.date.year && day.month == reminderUpdated.date.month && day.dayNumber == reminderUpdated.date.day) { // same day after updated
      this.updateReminderInDay(reminderUpdated, dayIndex)
    } else {
      this.removeReminderFromDay(reminderUpdated._id, dayIndex);
      this.addReminderToDay(reminderUpdated);
    }
  }

  removeReminderFromDay(reminderId: string, dayIndex: number) {
    this.days[dayIndex].reminders = this.days[dayIndex].reminders.filter((item: Reminder) => {
      return item._id !== reminderId
    });
  }

  updateReminderInDay(reminderUpdated: Reminder, dayIndex: number) {
    this.days[dayIndex].reminders = this.days[dayIndex].reminders.map((reminder: Reminder) => {
      if (reminder._id == reminderUpdated._id) {
        reminder = reminderUpdated;
      }
      return reminder;
    })
  }


}
