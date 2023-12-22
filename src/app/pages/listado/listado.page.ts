import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmpresaComponent } from 'src/app/components/empresa/empresa.component';
import { UiService } from 'src/app/services/ui.service';
import { EmpresasService } from '../../services/empresas.service';
import { TextoService } from '../../funciones/texto.service';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  date1: string ='' ;
  date2: string = '';

  listadoEmpresas: any = [];
  habilitado = true;

  constructor( private empresa: EmpresasService, private ui: UiService,
               private modalCtrl: ModalController,
               private textoService: TextoService
              
    ) { }

  ngOnInit() {
    this.siguientes(null, true);
  }

  recargar( event?:any ){
    this.siguientes( event, true);
    this.habilitado = true;
    this.listadoEmpresas = [];
  }
 

  async siguientes( event?:any, pull: boolean = false ){

    this.empresa.empresas( pull ).
      subscribe ( resp => {
       //console.log(resp);
        if( resp.ok ){

          if( resp.ok ){
            //this.ui.presentToas ( 'No hay mas empresas','warning',1500 );
            //console.log(resp.empresas);
            this.listadoEmpresas.push(...resp.empresas );
            
            if( event ) {
              event.target.complete();
              if( resp.empresas.length === 0 ){
                this.habilitado = false;
              }
            }
          }

        }else{
          this.ui.presentToas('No hay mas empresas','warning',1500 );
        }
      });
  }

  async verEmpresa( idEmpresa: number ){

     let fecha1: string;
     let fecha2: string;

    if(this.date1){
       fecha1 = this.textoService.formatFecha( this.date1);
    }else{
       fecha1 = this.textoService.fechaHoy();      
    }

    if(this.date2){
      fecha2 = this.textoService.formatFecha( this.date2);
    }else{
      fecha2 = this.textoService.fechaHoy();
    }
    
    const datosEmpresa = {
      idEmpresa,
      fecha1: fecha1, 
      fecha2: fecha2
    }
  
   const modal = await this.modalCtrl.create({

    component: EmpresaComponent,
    componentProps:{
      datosEmpresa
    },    
    cssClass: 'fullscreenModalEmpresa'

   });
   modal.present();
  }

  
}
