import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { UiService } from './ui.service';
//import * as CryptoJS  from  'crypto-js';
import { NavController } from '@ionic/angular';
import { TextoService } from '../funciones/texto.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = '';
  
  constructor(private http: HttpClient,private storage: Storage, private ui: UiService, private navCtrl: NavController,
              private funcion: TextoService) {
                storage.create();
               }

  async login(email:string, password: string,codigo: string){
    const data = {email, password,codigo};

    return new Promise( resolve => {
      this.http.post(`${ URL }/login`,(this.funcion.encryptar(data) )).
        subscribe( async (resp:any) => {
   
          if(resp['ok']){            
            await this.guardarToken( resp['token'] );
            resolve (true);
          }else{
            this.token = '';
            this.storage.clear();
            resolve( false );
          }

        });
      
    });
  }

  async verificaEmail(email:string){
    const data = {email};

    return new Promise( resolve => {
      this.http.post(`${ URL }/verificacodigo`,(data)).
        subscribe( async (resp:any) => {
   
          if(resp['ok']){
            //console.log(resp);            
            resolve (true);
          }else{
            resolve( false );
          }

        });
      
    });
  }

  logout(){
    this.token   = '';
    //this.usuario = '';
    this.storage.clear();        
    this.navCtrl.navigateRoot('/verifica',{ animated: true });
  }

  async guardarToken( token: string ) {
    this.token = token;
    await this.storage.set('token', token);
    await this.validaToken();
  }

  async cargarToken(){
    this.token = await this.storage.get('token') || null;
  }
 
  async validaToken(): Promise<boolean> {
 
     await this.cargarToken();
      
     if( !this.token ){
       this.navCtrl.navigateRoot('/verifica');
       return Promise.resolve(false);
     }
 
     return new Promise<boolean>( resolve => {
       this.http.get(`${ URL }/usertoken/`).
         subscribe( (resp: any) => {
           //console.log( resp );
           // eslint-disable-next-line @typescript-eslint/dot-notation
           if(resp['ok']){
             // eslint-disable-next-line @typescript-eslint/dot-notation
             //this.usuario = resp['usuario'];
             resolve(true);
           }else{
             //1027: En el servidor la forma de recibir el token es diferente
             this.ui.presentToas('Problemas con el token de usuario, [1027]','danger');
             this.navCtrl.navigateRoot('/verifica');
             resolve(false);
           }
 
         });
 
     });
  }

}
