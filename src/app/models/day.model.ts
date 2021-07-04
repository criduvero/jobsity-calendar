import { Reminder } from "./reminder.model";

export interface Day {
  year: number;
  month: number;
  dayNumber: number;
  weekDay: number;
  dateFormatted: String;
  date: moment.Moment;
  currentMonth?: boolean;
  previousMonth?: boolean;
  nextMonth?: boolean;
  reminders?: Reminder[];
}
