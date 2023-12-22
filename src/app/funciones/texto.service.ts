/* eslint-disable @typescript-eslint/dot-notation */

import * as CryptoJS  from  'crypto-js';

import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class TextoService {

  constructor() { }

  formatFecha( fecha1: string){       
    const fecha = new Date(fecha1);    
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; 
    const anio = fecha.getFullYear();    
    const fechaFormateada = `${anio}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;    
    return fechaFormateada;
  }

  fechaHoy(){       
    const fecha = new Date();    
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; 
    const anio = fecha.getFullYear();    
    const fechaFormateada = `${anio}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;    
    return fechaFormateada;
  }

  exportToExcel(jsonData: any[], fileName: string) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, fileName);
  }

  encryptar( parametro: any ){
    const key = CryptoJS.enc.Hex.parse('0123456789abcdef0123456789abcdef');
    const iv: any =  CryptoJS.enc.Hex.parse('abcdef9876543210abcdef9876543210');
    return parametro = CryptoJS.AES.encrypt(JSON.stringify(parametro), key, { iv }).toString();
    //Desencriptar
    //usuario = JSON.parse(CryptoJS.AES.decrypt(usuario, key, { iv }).toString(CryptoJS.enc.Utf8));
  }




}
