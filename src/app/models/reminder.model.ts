export interface Reminder {
  date: moment.Moment;
  year: number;
  month: number;
  // hour: moment.Moment;
  // city: xxx;
  text: string;
  color: string
  _id?: string;
}
