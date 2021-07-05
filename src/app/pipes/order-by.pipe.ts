import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'
import { Reminder } from '../models/reminder.model';

@Pipe({
  name: 'orderBy',
  pure: false
})
export class OrderByPipe implements PipeTransform {

  transform(reminders: Reminder[], ...args: unknown[]): unknown {
    return _.sortBy(reminders, args);
  }

}
