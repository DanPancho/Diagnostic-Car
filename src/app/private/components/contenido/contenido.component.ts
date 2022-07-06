import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/public/services/login/login.service';
import { Carrito, Producto, Tipo } from '../interfaces/contenido';
import { ContenidoService } from '../services/contenido/contenido.service';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {

  url: string;
  coleccion: string;
  productos: Producto[] = []
  delantero: Tipo[] = []
  trasero: Tipo[] = []
  constructor(private router: Router, private content_service: ContenidoService, private login_service: LoginService) {
    this.url = this.router.url;
    this.coleccion = '';
  }

  ngOnInit(): void {

    let aux = this.url.split('/')
    this.coleccion = "electronica_" + aux[3];
    let subs = this.content_service.obtenerContenido(this.coleccion.toLowerCase()).subscribe((data) => {
      let aux: any = data;
      this.productos = aux;
      this.onStart(this.productos)
      subs.unsubscribe()
    })
   
  }

  onStart(productos:Producto[]){
    for(let i = 0; i < productos.length; i++){
      if(productos[i].tipo == 'delantero'){
        this.delantero.push(productos[i])
      }else{
        this.trasero.push(productos[i])
      }
    }
  }

  onClick1(indice:number){
    let produto = this.delantero[indice]
    this.content_service.buscarIdProducto(this.coleccion,produto.nombre).subscribe((data)=>{
      this.login_service.getUser().subscribe((user)=>{
        let carrito:Carrito;
        carrito = {
          userid: user?.uid,
          productos:{
            productoId:data.docs[0].id,
            producto: produto
          },
          total: 100,
          estado:false
        }
        this.content_service.agregarCarrito("carrito",carrito);
      })
      
    })
    // busqueda del id producto en la base de datos
  }
  onClick2(indice:number){
    let produto = this.trasero[indice]
  }

  
}
