import { Component, OnInit } from '@angular/core';
import {ContenidoService} from '../services/contenido/contenido.service'
import SwiperCore, {Navigation } from "swiper";
import { Mecanica } from '../interfaces/contenido';

SwiperCore.use([Navigation]);
@Component({
  selector: 'app-slide-servicios',
  templateUrl: './slide-servicios.component.html',
  styleUrls: ['./slide-servicios.component.scss'],
})
export class SlideServiciosComponent implements OnInit {

  mecanica:Mecanica[];
  slider:Mecanica[];
  taller:Mecanica[];
  aux:any[];
  constructor(private contenido_service:ContenidoService) {
    this.mecanica = [];
    this.slider = [];
    this.aux = [];
    this.taller = [];
  }

  ngOnInit(): void {
    this.contenido_service.obtenerContenido('mecanica-express').subscribe((data)=>{
      this.aux = data;
      this.mecanica =  this.aux;
      this.ordenar(this.mecanica);
    })
  }

  ordenar(aux:Mecanica[]):void{
    aux.forEach((data)=>{
      if(data.front ==='slider'){
        this.slider.push(data)
      }else if(data.front === 'taller'){
        this.taller.push(data)
      }
    })
    console.log(this.taller)
  }

}
