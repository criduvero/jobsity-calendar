import { NgModule } from '@angular/core';

import { CalendarRoutingModule } from './calendar-routing.module';
import { MonthComponent } from './month/month.component';
import { SharedModule } from '../shared/shared.module';
import { ReminderModalComponent } from './reminder-modal/reminder-modal.component';
import { DayComponent } from './day/day.component';


@NgModule({
  declarations: [
    MonthComponent,
    ReminderModalComponent,
    DayComponent
  ],
  imports: [
    SharedModule,
    CalendarRoutingModule
  ]
})
export class CalendarModule { }
