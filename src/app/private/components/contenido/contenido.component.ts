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
  aux:any
  constructor(private login_service:LoginService,private router: Router, private content_service: ContenidoService) {
    this.url = this.router.url;
    this.coleccion = '';
    this.carrito = [];
    this.idCarrito = "";
    this.login_service.getUser().subscribe((user)=>{
      this.uid = user?.uid;
      let subscripcion = this.content_service.buscarIdCarrito(this.uid).subscribe((carrito)=>{
        this.idCarrito = carrito.docs[0].id;
        subscripcion.unsubscribe();
      })      
    })
  }

  ngOnInit(): void {
    let aux = this.url.split('/')
    this.coleccion = "electronica_" + aux[3];
    let subs = this.content_service.obtenerContenido(this.coleccion.toLowerCase()).subscribe((data) => {
      this.aux = data;
      this.productos = this.aux;
      this.onStart(this.productos)
      if (this.uid != "" && this.uid != undefined) {
        this.obtenerCarrito(this.uid)
      }
      subs.unsubscribe();
    })

  }

  onStart(productos: Producto[]) {

    for(let producto of productos){
      if(producto.tipo == 'delantero'){
        this.delantero.push(producto)
      }else{
        this.trasero.push(producto)
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
        // calculo del total
        this.calcTotal()
        this.content_service.agregarCarrito('carrito',this.idCarrito,this.carrito[0]).then(()=>{
          alert("Se agrego en el carrito con exito!")
        });
      }
      sub_id.unsubscribe();
    })
  }
  calcTotal(){
    this.carrito[0].productos.producto.forEach((producto)=>{
      this.carrito[0].total += producto.precio;
    })
  }
  onClick2(indice: number) {
    let produto = this.trasero[indice]
    console.log(produto)
    console.log(this.uid)
  }
  nuevoProducto(data: any, producto: Tipo):NuevoProducto {
    return {
      productoId: data.docs[0].id,
      img: producto.img,
      descripcion: producto.descripcion,
      marca: producto.marca,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    }
  }

  produtoRepetido(idProdcuto: string) {
    for(let producto of this.carrito[0].productos.producto){
      if(producto.productoId == idProdcuto){
        return true
      }
    }
    return false

  }

  obtenerCarrito(userId: string | undefined) {
    let sub_Productos = this.content_service.obtenerProductosCliente(userId).subscribe((data) => {
      this.aux = data;
      this.carrito = this.aux;
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
