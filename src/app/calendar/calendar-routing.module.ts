import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthComponent } from './month/month.component';

const routes: Routes = [
  { path: '', component: MonthComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
