import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private toas: ToastController ) { }

  async presentToas(mensaje: string, color?: string, duracion: number = 150 ) {

    const toast = await this.toas.create({
      message: mensaje,
      position:'top',
      duration: duracion,
      color: color
    });
    await toast.present();
  }

}
