import { Component, OnInit,Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UiService } from '../../services/ui.service';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-abono',
  templateUrl: './abono.component.html',
  styleUrls: ['./abono.component.scss'],
})
export class AbonoComponent  implements OnInit {

  @Input() empresaid:any;
  empresa: any = {};


  meses = [
    { nombre: 'Enero', valor: 'ENERO' },
    { nombre: 'Febrero', valor: 'FEBRERO' },
    { nombre: 'Marzo', valor: 'MARZO' },
    { nombre: 'Abril', valor: 'ABRIL' },
    { nombre: 'Mayo', valor: 'MAYO' },
    { nombre: 'Junio', valor: 'JUNIO' },
    { nombre: 'Julio', valor: 'JULIO' },
    { nombre: 'Agosto', valor: 'AGOSTO' },
    { nombre: 'Septiembre', valor: 'SEPTIEMBRE' },
    { nombre: 'Octubre', valor: 'OCTUBRE' },
    { nombre: 'Noviembre', valor: 'NOVIEMBRE' },
    { nombre: 'Diciembre', valor: 'DICIEMBRE' }
  ];

  anos = [
    { nombre: 2024, valor: '2024' },
    { nombre: 2025, valor: '2025' },
    { nombre: 2026, valor: '2026' },
    { nombre: 2027, valor: '2027' },
    { nombre: 2028, valor: '2028' },
    { nombre: 2029, valor: '2029' },
    { nombre: 2030, valor: '2030' }    
  ];

  tipos = [
    { nombre: 'PAGADO', valor:'PAGADO' },
    { nombre: 'PENDIENTE', valor:'PENDIENTE' }    
  ];

  pagovarios = [
     { nombre:'QUICKBOOK' , valor:'QUICKBOOK'},
     { nombre:'PAYPAL' , valor:'PAYPAL'},
     { nombre:'ZELLE' , valor:'ZELLE'},
     { nombre:'STRIPE' , valor:'STRIPE'},
     { nombre:'TRANSFERENCIA' , valor:'TRANSFERENCIA'},
     { nombre:'EFECTIVO' , valor:'EFECTIVO'},
     { nombre:'OTROS' , valor:'OTROS'}
  ];

  constructor(private modalctrl: ModalController,
              private uiservice: UiService,
              private empresasService: EmpresasService) { }

  ngOnInit() {}

  regresar(){
    this.modalctrl.dismiss();
  }

  async nuevoAbono( fabono: NgForm ){    

    this.empresa.id = this.empresaid.id;

    if(fabono.invalid){
      this.uiservice.presentToas('Faltan campos requeridos?','danger',3000);
      return
    }

    const valido = await this.empresasService.nuevoAbono ( this.empresa );

    if( valido ){
      
      this.uiservice.presentToas('Empresa editada con exito!','success',3000);
      this.modalctrl.dismiss('ok');      
      
    }else{
      this.uiservice.presentToas('No se pudo editar la empresa!','danger',5000);
    }


  }

  updateCheckbox(fieldName: string, event: any) {
    if (event.detail.checked) {
      // Marcar la casilla de verificación
      this.empresa[fieldName] = '1'; // Actualizar a '1' cuando se marque
    } else {
      // Desmarcar la casilla de verificación
      this.empresa[fieldName] = ''; // Actualizar a '0' cuando se desmarque
    }
  }


}
