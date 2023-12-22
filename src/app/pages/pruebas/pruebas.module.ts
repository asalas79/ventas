import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PruebasPageRoutingModule } from './pruebas-routing.module';

import { PruebasPage } from './pruebas.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {TableModule} from 'primeng/table';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PruebasPageRoutingModule,
    NgxDatatableModule,
    InputTextModule,
    CalendarModule,
    TableModule  
  ],
  declarations: [PruebasPage],
  
})
export class PruebasPageModule {



}
