interface ReminderDate {
  year: number,
  month: number,
  day: number
}

interface ReminderTime {
  hour: number,
  minute: number
}
export class Reminder {
  constructor(
    public title: string,
    public date: ReminderDate,
    public time: ReminderTime,
    public color: string,
    public city: string,
    public _id?: string
  ) {}
}
