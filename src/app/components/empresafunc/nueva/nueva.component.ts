import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UiService } from '../../../services/ui.service';
import { EmpresasService } from '../../../services/empresas.service';



@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.scss'],
})
export class NuevaComponent  implements OnInit {

  NuevaEmpresa = {
    nombre:'',
    url:'',
    contacto:'',
    pagomensual:'',
    formadepago:'',
    version:8.2,
    fechaingreso:'',
    
  }

  constructor(private modalctrl: ModalController,
              private uiservice: UiService,
              private empresasService: EmpresasService
              ) { }

  ngOnInit() {}

  regresar(){
    this.modalctrl.dismiss();
  }

  async nuevaEmpresa( fnueva: NgForm ){

    //console.log(this.NuevaEmpresa)

    if(fnueva.invalid){
      this.uiservice.presentToas('Falta campos requeridos?','danger',3000);
      return
    }

    const valido = await this.empresasService.crearEmpresa ( this.NuevaEmpresa );

    if( valido ){
      
      this.uiservice.presentToas('Empresa creada con exito!','success',3000);
      this.modalctrl.dismiss('ok');      
      
    }else{
      this.uiservice.presentToas('No se pudo crear la empresa!','danger',5000);
    }

  }

}
