import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Day } from 'src/app/models/day.model';
import { Reminder } from 'src/app/models/reminder.model';
import { CalendarService } from 'src/app/services/calendar.service';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-reminder-modal',
  templateUrl: './reminder-modal.component.html',
  styleUrls: ['./reminder-modal.component.scss']
})
export class ReminderModalComponent implements OnInit {

  @Input() day: Day;
  @Input() reminderId: string;
  reminder: Reminder = new Reminder('', {year: 2021, month: 7, day: 3}, {hour: null, minute: null}, '#2f75b5');// corregir
  isLoading = false;
  // @ViewChild(NgbDatepicker) d: NgbDatepicker;
  faCalendarAlt = faCalendarAlt;


  constructor(
    private calendarService: CalendarService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.reminderId ? this.get(this.reminderId) : null ;
  }

  get(reminderId: string) {
    this.calendarService.get(reminderId)
      .subscribe((data: Reminder) => {
        // console.log(data);
        this.reminder = data;
      },
      error => this.toastr.error(error, 'Error getting reminder'));
  }

  onSubmit() {
    this.isLoading = true;
    this.reminderId ? this.onUpdate() : this.onCreate();
  }

  onCreate() {
    this.calendarService.create(this.reminder)
      .subscribe(
        (data: Reminder) => {
          this.toastr.success('The reminder has been successfully created', 'Successful operation');
          console.log('creado en componente', data);

          this.isLoading = false;
          this.activeModal.close();
        },
        error => {
          this.toastr.error(error, 'Failed operation');
          this.isLoading = false;
        });
  }

  onUpdate() {
    /* this.gService.updateWithPicture(this.constants.products, this.product, this.fileToUpload)
      .subscribe(
        (data: Product) => {
          this.toastr.success('El producto se ha actualizado correctamente', 'Operación exitosa');
          this.isLoading = false;
          this.activeModal.close();
          },
        error => {
          this.toastr.error(error, 'Operación fallida');
          this.isLoading = false;
        }); */
  }

}
