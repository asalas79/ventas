import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmpresaComponent } from 'src/app/components/empresa/empresa.component';
import { UiService } from 'src/app/services/ui.service';
import { EmpresasService } from '../../services/empresas.service';
import { TextoService } from '../../funciones/texto.service';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { NuevaComponent } from 'src/app/components/empresafunc/nueva/nueva.component';
import { EditarComponent } from 'src/app/components/empresafunc/editar/editar.component';


@Component({
  selector: 'app-couriers',
  templateUrl: './couriers.page.html',
  styleUrls: ['./couriers.page.scss'],
})
export class CouriersPage implements OnInit {

  date1: string ='' ;
  date2: string = '';
  listadoEmpresas: any = [];
  habilitado = true;
  products1:any[] =[];
  products2: any[]=[];
  products3: any[]=[];
  textoBuscar: string='';


  constructor(
              private empresa: EmpresasService, 
              private ui: UiService,
              private modalCtrl: ModalController,
              private textoService: TextoService,
              private TextoService: TextoService,
              private iab: InAppBrowser
              ) { }

  ngOnInit() {
    //this.productService.getProductsSmall().then(data => this.products1 = data);
    this.siguientes(null, true); 
    
  }

  onSearchChange( event:any ){
    this.textoBuscar = event.detail.value;
  }

  async siguientes( event?:any, pull: boolean = false ){

    this.listadoEmpresas= [];
    this.empresa.empresas( pull ).
      subscribe ( resp => {       
        if( resp.ok ){
          if( resp.ok ){
            //this.ui.presentToas ( 'No hay mas empresas','warning',1500 );
            //console.log(resp.empresas);
            this.listadoEmpresas.push(...resp.empresas ); 
          }

        }else{
          this.ui.presentToas('No hay mas empresas','warning',1500 );
        }
      });
  }

  async verEmpresa( idEmpresa: number, empresaNombre: string,empresa: any ){
    
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
      empresaNombre,
      fecha1: fecha1, 
      fecha2: fecha2,
      empresa
    }
 
    const modal = await this.modalCtrl.create({

    component: EmpresaComponent,
    componentProps:{
      datosEmpresa
    },    
    cssClass: 'fullscreenModalEmpresa' // esta en el css global

    });
    modal.present();
 }

 excel(){

  if(this.listadoEmpresas){  
    this.textoService.exportToExcel(this.listadoEmpresas, new Date()+'.xlsx');
  }else{
    
  }
 }

 abrirBrowswer( url: any){
    //console.log(url);
    const browser = this.iab.create( url, '_system', 'location=yes');
    browser.show();
 } 

 async nueva(){  
    const modal = await this.modalCtrl.create({
      component: NuevaComponent 
    });

    modal.onDidDismiss().then((data) => {
    
      if(data.data === 'ok'){        
        this.siguientes();
      }

    });
    modal.present();
 }

 async editarEmpresa(empresa: any){

    const modal = await this.modalCtrl.create({
      component: EditarComponent,
      componentProps: {NuevaEmpresa:empresa}
    });

    modal.onDidDismiss().then((data) => {  
      if(data.data === 'ok'){      
        this.siguientes();
      }
    });
    modal.present();
 }

}
