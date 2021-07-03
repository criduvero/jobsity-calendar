export class Reminder {
  constructor(
    // public date: moment.Moment,
    public year: number,
    public month: number,
    public day: number,
    // public hour: moment.Moment,
    // public city: xxx,
    public title: string,
    public time: string,
    public color: string,
    public _id?: string
  ) {}
}
