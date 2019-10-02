import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sliders, Eye, Delete, PlusCircle } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

const icons = {
  Sliders,
  Eye,
  Delete,
  PlusCircle
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
