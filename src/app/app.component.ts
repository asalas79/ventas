import { Component } from '@angular/core';
import { UsuarioService } from './services/usuario.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [    
    //{ title: 'Pruebas', url: '/pruebas', icon: 'warning' },
    { title: 'Empresas', url: '/main', icon: 'warning' },
    //{ title: 'Listado', url: '/listado', icon: 'mail' }
  
  
  ];
  //spublic labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private usuarioService: UsuarioService
             ) {}

  logout(){
    this.usuarioService.logout();
  }

  
  
}
