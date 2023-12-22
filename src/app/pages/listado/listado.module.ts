import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoPageRoutingModule } from './listado-routing.module';

import { ListadoPage } from './listado.page';
import { ComponentsModule } from '../../components/components.module';

//Libreria del templateng
import {CalendarModule} from 'primeng/calendar';
import {DividerModule} from 'primeng/divider';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoPageRoutingModule,
    ComponentsModule,
    CalendarModule,
    DividerModule
  ],
  declarations: [
      ListadoPage
      
  ]
})
export class ListadoPageModule {}
