import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contenido } from '../interfaces/contenido';
import { ContenidoService } from '../services/contenido/contenido.service';

@Component({
  selector: 'app-electronica',
  templateUrl: './electronica.component.html',
  styleUrls: ['./electronica.component.css']
})
export class ElectronicaComponent implements OnInit {
  ruta:string
  content:Contenido[] = []
  ind:number;
  constructor(private router:Router, private content_service:ContenidoService) {
    this.ruta = this.router.url;
    this.ind = -1;
   }

  ngOnInit(): void {
    this.cargarContenido(this.router.url)
    this.ruta.includes('audio')
  }

  cargarContenido(ruta :string){
    let aux:any;
    let subcripcion = this.content_service.obtenerContenido(this.obtenerColecion(ruta)).subscribe((data)=>{
      aux = data;
      this.content = aux;
      subcripcion.unsubscribe();
    })
    
  }

  obtenerColecion(ruta:string):string{
    let data = ruta.split('/')
    if(data[2] == 'audio')
      return 'electronica_audio'
    else if(data[2] == 'video')
      return 'electronica_video'
    return ''
  }

  onClick(opcion:string, indice:number){
    this.ind = indice;
    this.router.navigate(['electronica/audio/'+this.transformacion(opcion)]);
  }

  transformacion(coleccion:string){
    let col = coleccion.split(' ');
    return col[col.length-1].toLowerCase();
  }
}
