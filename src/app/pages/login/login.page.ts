import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular'
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiService } from '../../services/ui.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUser = {
    email:'',
    clave: '',
    codigo: ''
  };

  constructor(private menuCtrl: MenuController,
              private uiservice: UiService,
              private usuarioService: UsuarioService,
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

  async login( fLogin: NgForm){
    
    if(fLogin.invalid){
      this.uiservice.presentToas('Colocar un Usuario y una Contraseña no pilla que se la esta pidiendo?','danger',5000);
      return
    }

    const valido = await this.usuarioService.login ( this.loginUser.email,this.loginUser.clave,this.loginUser.codigo);

    if( valido ){
      this.navctrl.navigateRoot( '/main',{ animated: true } );
    }else{
      this.uiservice.presentToas('Usuario o contraseñas no son correctos!','danger',5000);
    }

  }

}
