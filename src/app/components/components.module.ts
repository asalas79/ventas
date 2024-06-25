import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaComponent } from './empresa/empresa.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './layout/header/header.component';
import { NuevaComponent } from './empresafunc/nueva/nueva.component';
import { FormsModule } from '@angular/forms';
import { EditarComponent } from './empresafunc/editar/editar.component';
import { AbonoComponent } from './abono/abono.component';


@NgModule({
  declarations: [
    EmpresaComponent,
    HeaderComponent,
    NuevaComponent,
    EditarComponent,
    AbonoComponent  
  ],
  exports:[
    EmpresaComponent,
    HeaderComponent    
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
