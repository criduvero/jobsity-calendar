import { NgModule } from '@angular/core';

import { CalendarRoutingModule } from './calendar-routing.module';
import { MonthComponent } from './month/month.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MonthComponent
  ],
  imports: [
    SharedModule,
    CalendarRoutingModule
  ]
})
export class CalendarModule { }
