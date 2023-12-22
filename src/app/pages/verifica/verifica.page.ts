import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiService } from '../../services/ui.service';
import { MenuController, NavController } from '@ionic/angular'

@Component({
  selector: 'app-verifica',
  templateUrl: './verifica.page.html',
  styleUrls: ['./verifica.page.scss'],
})
export class VerificaPage implements OnInit {

  loginUser = {
    email:''    
  };

  constructor(private uiservice: UiService,
              private usuarioService: UsuarioService,
              private menuCtrl: MenuController,
              private navctrl: NavController) { }

  ngOnInit() {
  }

  //Para disable el menu lateral
  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

  //Para que se habilite cuando salga de este controlador
  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  async validarEmail( fvalidar: NgForm){
    
    if(fvalidar.invalid){
      this.uiservice.presentToas('Colocar email para enviar clave de verificación','danger',5000);
      return
    }

    const valido = await this.usuarioService.verificaEmail( this.loginUser.email);

    if( valido ){
      this.uiservice.presentToas('Se envio un email con tu codigo','primary',5000);
      this.navctrl.navigateRoot( '/login',{ animated: true } );
    }else{
      this.uiservice.presentToas('email invalido o no existe!','danger',5000);
    }

  }

}
