import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContenidoService } from '../services/contenido/contenido.service';

@Component({
  selector: 'app-barralateral',
  templateUrl: './barralateral.component.html',
  styleUrls: ['./barralateral.component.css']
})
export class BarralateralComponent implements OnInit {

  activar: number;
  onOpen:boolean;
  constructor(private contenido_service:ContenidoService,private router: Router) {
    this.activar = 0;
    this.activacion();
    this.onOpen = false;
  }

  ngOnInit(): void {
    this.contenido_service.$activarBarraLateral.subscribe(data=>{
      this.onOpen = data;
    })
  }

  onClose(){
    this.onOpen = false;
  }

  onClick(direccion: string) {
    this.router.navigate([direccion])
  }

  activacion() {
    if (this.router.url == '/electronica/audio')
      this.activar = 1;
    else if (this.router.url == '/electronica/video')
      this.activar = 2;
    else if (this.router.url == '/electronica/alarmas')
      this.activar = 3;
    else if (this.router.url == '/electronica/scanner')
      this.activar = 4;
    else if (this.router.url == '/electronica/diagnosticos')
      this.activar = 5;
    else if (this.router.url == '/electronica/luces')
      this.activar = 6;
    else if (this.router.url == '/electronica/adaptadores')
      this.activar = 7;
  }
}
