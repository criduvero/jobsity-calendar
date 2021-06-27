import { Injectable } from '@angular/core';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class Globals {

  smModal: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
    size: 'sm'
  };

  mdModal: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
    size: 'md'
  };

  lgModal: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
    size: 'lg'
  };

  xlModal: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
    size: 'xl'
  };
}
