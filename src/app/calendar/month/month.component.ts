import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'

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


  constructor() { }

  ngOnInit(): void {
    this.year = moment().year();
    this.month = moment().month();
    console.log(this.month);
    console.log(this.year);

    this.days = this.getDays(this.year, this.month);
  }

  getDays(year: number, month: number) {
    const daysInMonthQty = moment().year(year).month(month).daysInMonth();
    const monthDays = [];

    for (let i = 1; i <= daysInMonthQty; i++) {
      monthDays.push({
        dayNumber: i,
        dateFormatted: moment().year(year).month(month).date(i).format('YYYY-MM-DD'),
        date: moment().year(year).month(month).date(i)
      });
    }

    const previousMonthDays = this.getPreviousMonthDays(year, month);
    const nextMonthDays = this.getNextMonthDays(year, month);

    return [
      ...previousMonthDays,
      ...monthDays,
      ...nextMonthDays,
    ];

  }

  getPreviousMonthDays(year, month) {
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

  getNextMonthDays(year, month) {
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

  getDays2(month, year) {

    /* const firstDay = moment.utc(`${year}-${month}-1`, 'YYYY-M-D');

    const lastDay = firstDay.clone().endOf('month');

    this.dateSelected = firstDay;

    const totalDays = Math.round(lastDay.diff(firstDay, 'days', true));

    const monthDays = Object.keys([ ...Array(totalDays)]).map((dayNumber: any) => {
      dayNumber = parseInt(dayNumber) + 1;

      const dayObject = moment(`${year}-${month}-${dayNumber}`);


      return {
        name: dayObject.format('dddd'),
        value: dayNumber,
        numberInWeek: dayObject.weekday() + 1
      }

    })

    this.monthDays = monthDays;

    console.log('monthDays', monthDays); */

  }



}
