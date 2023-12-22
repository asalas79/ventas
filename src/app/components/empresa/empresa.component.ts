
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmpresasService } from '../../services/empresas.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss'],
})
export class EmpresaComponent  implements OnInit {

  @Input() datosEmpresa: any;
  guias: any ={};
  agencias: any ={};
  usuarios: any ={};
  casilleros: any ={};  
  person: any ={};
  paquete: any ={}; 
  persmisosEmpresa : any = {}; 

  constructor( private modalctrl: ModalController,
               private empresasService:EmpresasService,
               private ui: UiService) { }

  ngOnInit() {
    this.buscarempresa();
  }

  regresar(){
    this.modalctrl.dismiss();
  }

  buscarempresa(){
    
    const datos = {
      idempresa:this.datosEmpresa.idEmpresa,
      fecha_inicio: this.datosEmpresa.fecha1,
      fecha_fin: this.datosEmpresa.fecha2,
      empresaNombre: this.datosEmpresa.empresaNombre     
    }

    this.empresasService.buscarEmpresa( datos ).
      subscribe( resp =>{

        if( resp['ok'] ){
          
          //console.log(this.datosEmpresa.empresa);

          this.persmisosEmpresa = this.datosEmpresa.empresa;

          this.guias = resp.guias.guias[0];                   

          this.agencias = resp.agencias.agencias[0];     
          
          if(resp.usuarios.ok){
            this.usuarios = resp.usuarios.usuarios[0]; 
          }

          if(resp.casilleros.ok){
            this.casilleros = resp.casilleros.casilleros[0]; 
          }

          if(resp.person.ok){
            this.person = resp.person.person[0];
          }

          if(resp.paquetes.ok){
            this.paquete = resp.paquetes.paquetes[0];
          }

    
        }else{
          this.ui.presentToas('No hay resultados o error en la conexion','danger',2500)
        }

      });


  }

}
