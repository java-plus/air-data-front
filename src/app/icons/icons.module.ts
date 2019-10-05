import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sliders, Eye, Trash2, PlusCircle, User, Power, Star, ToggleLeft, ToggleRight, MapPin, Check } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

const icons = {
  Sliders,
  Eye,
  Trash2,
  PlusCircle,
  User,
  Power,
  Star,
  ToggleRight,
  ToggleLeft,
  MapPin,
  Check
}

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
