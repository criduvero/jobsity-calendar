import { Reminder } from "./reminder.model";

export interface Day {
  year: number;
  month: number;
  dayNumber: number;
  dateFormatted: String;
  date: moment.Moment;
  previousMonth?: boolean;
  nextMonth?: boolean;
  reminders?: Reminder[];
}
