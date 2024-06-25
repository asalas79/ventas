
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmpresasService } from '../../services/empresas.service';
import { UiService } from '../../services/ui.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

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
  guiasano: any=[];
  pagos:any=[];
  persmisosEmpresa : any = {}; 
  cobroporitemparamc:number=0;

  constructor( private modalctrl: ModalController,
               private empresasService:EmpresasService,
               private ui: UiService,
               private iab: InAppBrowser
               ) { }

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

          console.log(resp);          
          if(this.datosEmpresa.empresa.cobroporitemparamc){
            this.cobroporitemparamc = this.datosEmpresa.empresa.cobroporitemparamc;
          }

          this.persmisosEmpresa = this.datosEmpresa.empresa;
          this.guias = resp.guias.guias[0];
          this.agencias = resp.agencias.agencias[0];     
          

          if(resp.guiasano.ok){
            if (Array.isArray(resp.guiasano.guias)) {
              this.guiasano = resp.guiasano.guias;
            } else {
              console.error("Error: guiasano.guias no es un array.");
            }
          }

          if(resp.pagos.ok){
            this.pagos = resp.pagos.pagos;
            console.log(this.pagos);
          }
          
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

  abrirBrowswer( url: any){
    //console.log(url);
    const browser = this.iab.create( url, '_system', 'location=yes');
    browser.show();
 } 

}
