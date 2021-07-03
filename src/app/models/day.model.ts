import { Reminder } from "./reminder.model";

export interface Day {
  dayNumber: number;
  dateFormatted: String;
  date: moment.Moment;
  previousMonth?: boolean;
  nextMonth?: boolean;
  reminders?: Reminder[];
}
