import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CouriersPageRoutingModule } from './couriers-routing.module';

import { CouriersPage } from './couriers.page';


//Libreria del templateng
import {CalendarModule} from 'primeng/calendar';
import {DividerModule} from 'primeng/divider';
import {TableModule} from 'primeng/table';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CouriersPageRoutingModule,
    TableModule,
    DividerModule,
    CalendarModule,
    ComponentsModule,
    PipesModule
    
  ],
  declarations: [CouriersPage]
})
export class CouriersPageModule {}
