import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ChunkPipe } from '../pipes/chunk.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ChunkPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    LaddaModule,
    HttpClientModule,
    FormsModule,
    ColorPickerModule,
    NgbModule,
    FontAwesomeModule,
    ChunkPipe
  ]
})
export class SharedModule { }
