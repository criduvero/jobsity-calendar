import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChunkPipe } from '../pipes/chunk.pipe';

@NgModule({
  declarations: [
    ChunkPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ChunkPipe
  ]
})
export class SharedModule { }
