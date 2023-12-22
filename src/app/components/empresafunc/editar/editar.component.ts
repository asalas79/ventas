import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UiService } from '../../../services/ui.service';
import { EmpresasService } from '../../../services/empresas.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent  implements OnInit {

  @Input() NuevaEmpresa:any; 
  toggleValue: any = false;

  constructor( private modalctrl: ModalController,
               private uiservice: UiService,
               private empresasService: EmpresasService) { }

  ngOnInit() {
    //console.log(this.NuevaEmpresa);
      if(this.NuevaEmpresa.inactivo === 1){
        this.toggleValue = 1;
      }else{
        this.toggleValue = 0;
      }
    }

  regresar(){
    this.modalctrl.dismiss();
  }

  async editarEmpresa( feditar: NgForm ){

    console.log(this.NuevaEmpresa)

    if(feditar.invalid){
      this.uiservice.presentToas('Faltan campos requeridos?','danger',3000);
      return
    }

    const valido = await this.empresasService.editarEmpresa ( this.NuevaEmpresa );

    if( valido ){
      
      this.uiservice.presentToas('Empresa editada con exito!','success',3000);
      this.modalctrl.dismiss('ok');      
      
    }else{
      this.uiservice.presentToas('No se pudo editar la empresa!','danger',5000);
    }

  }

  onToggleChange(event:any) {
    if (event) {
      this.toggleValue = 1;
    } else {
      this.toggleValue = 0;
    }
    //console.log(this.toggleValue);

  }

  updateCheckbox(fieldName: string, event: any) {
    if (event.detail.checked) {
      // Marcar la casilla de verificación
      this.NuevaEmpresa[fieldName] = '1'; // Actualizar a '1' cuando se marque
    } else {
      // Desmarcar la casilla de verificación
      this.NuevaEmpresa[fieldName] = ''; // Actualizar a '0' cuando se desmarque
    }
  }

}
