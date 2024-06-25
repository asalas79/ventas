import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})

export class EmpresasService {

  paginaPost = 0;

  constructor (private http: HttpClient) { }

  empresas( pull:boolean = false){
    if( pull ){
      this.paginaPost = 0;
    }    

    this.paginaPost ++;
    return this.http.get<any>(` ${ URL }/listadoempresas/?pagina=${ this.paginaPost }`);
  }

  buscarEmpresa( datos: any){      
    return this.http.post<any>(`${ URL }/resumen`, datos);    
  }

  crearEmpresa(data: any){
    return new Promise( resolve => {
      this.http.post(`${ URL }/crearempresa`,(data)).
        subscribe( async (resp:any) => {
          //console.log(resp);
          if(resp['ok']){                   
            resolve (true);
          }else{            
            resolve( false );
          }
        });      
    });
  }

  editarEmpresa( data: any){
    return new Promise( resolve => {
      this.http.post(`${ URL }/editarempresa`,(data)).
        subscribe ( async (resp: any) => {

           // console.log( resp );

            if( resp['ok']){
              resolve(true);
            }else{
              resolve(false);
            }

        });
    })
  }

  nuevoAbono( data: any){
    return new Promise( resolve => {
      this.http.post(`${ URL }/nuevoabono`,(data)).
        subscribe ( async (resp: any) => {
           // console.log( resp );
            if( resp['ok']){
              resolve(true);
            }else{
              resolve(false);
            }
        });
    })
  }

}
