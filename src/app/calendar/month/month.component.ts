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
  monthDays: any[];
  dateSelected: any;
  constructor() { }

  ngOnInit(): void {
    this.getDays(6, 2021)
  }

  getDays(month, year) {

    const firstDay = moment.utc(`${year}-${month}-1`, 'YYYY-M-D');

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

    console.log('monthDays', monthDays);

  }

}
