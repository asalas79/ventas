import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { IonMenu, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  constructor( private usuarioService: UsuarioService, private menu: MenuController) { }

  ngOnInit() {}

  logout(){
    this.usuarioService.logout();
  }

  cerrarMenu() {
    this.menu.toggle('main-content');
  }

}
