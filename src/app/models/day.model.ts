import { Reminder } from "./reminder.model";

export interface Day {
  date: number;
  moment: moment.Moment;
  last_month?: boolean;
  next_month?: boolean;
  reminders: Reminder[];
}
