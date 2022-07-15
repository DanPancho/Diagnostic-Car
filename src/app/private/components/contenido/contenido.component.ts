import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/public/services/login/login.service';
import { Carrito, NuevoProducto, Producto, Tipo } from '../interfaces/contenido';
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
  carrito: Carrito[];
  uid: string | undefined;
  idCarrito: string;
  constructor(private login_service:LoginService,private router: Router, private content_service: ContenidoService) {
    this.url = this.router.url;
    this.coleccion = '';
    this.carrito = [];
    this.idCarrito = "";
    this.login_service.getUser().subscribe((data)=>{
      this.uid = data?.uid;
      let subscripcion = this.content_service.buscarIdCarrito(this.uid).subscribe((data)=>{
        this.idCarrito = data.docs[0].id;
        subscripcion.unsubscribe();
      })      
    })
  }

  ngOnInit(): void {
    let aux = this.url.split('/')
    this.coleccion = "electronica_" + aux[3];
    let subs = this.content_service.obtenerContenido(this.coleccion.toLowerCase()).subscribe((data) => {
      let aux: any = data;
      this.productos = aux;
      this.onStart(this.productos)
      if (this.uid != "" && this.uid != undefined) {
        this.obtenerCarrito(this.uid)
      }
      subs.unsubscribe();
    })

  }

  onStart(productos: Producto[]) {
    for (let i = 0; i < productos.length; i++) {
      if (productos[i].tipo == 'delantero') {
        this.delantero.push(productos[i])
      } else {
        this.trasero.push(productos[i])
      }
    }
  }

  onClick1(indice: number) {
    let producto: Tipo = this.delantero[indice]
    let sub_id = this.content_service.buscarIdProducto(this.coleccion, producto.nombre).subscribe((data) => {
      if (this.produtoRepetido(data.docs[0].id)) {
        alert("ESTE PRODUCTO YA SE ENCUENTRA EN El CARRITO")
      } else {
        this.carrito[0].productos.producto.push(this.nuevoProducto(data, producto))
        this.content_service.agregarCarrito('carrito',this.idCarrito,this.carrito[0]).then(()=>{
          alert("Se agrego en el carrito con exito!")
        });
      }
      sub_id.unsubscribe();
    })
  }
  onClick2(indice: number) {
    let produto = this.trasero[indice]
    console.log(this.carrito)
    console.log(this.uid)
  }
  nuevoProducto(data: any, producto: Tipo) {
    return {
      productoId: data.docs[0].id,
      img: producto.img,
      descripcion: producto.descripcion,
      marca: producto.marca,
      nombre: producto.nombre,
      precio: producto.precio
    }
  }

  produtoRepetido(idProdcuto: string) {
    for (let i = 0; i < this.carrito[0].productos.producto.length; i++) {
      if (this.carrito[0].productos.producto[i].productoId == idProdcuto) {
        return true
      }
    }
    return false
  }

  obtenerCarrito(userId: string | undefined) {
    let sub_Productos = this.content_service.obtenerProductosCliente(userId).subscribe((data) => {
      let aux: any = data;
      this.carrito = aux;
      sub_Productos.unsubscribe();
    })
  }

  obtenerIdCarrito(){
    let subscripcion = this.content_service.buscarIdCarrito(this.uid).subscribe((data)=>{
      this.idCarrito = data.docs[0].id;
      subscripcion.unsubscribe();
    })

  }

}
