import { Component } from '@angular/core';
import { LoginService } from 'src/app/public/services/login/login.service';
import { Carrito } from '../interfaces/contenido';
import { ContenidoService } from '../services/contenido/contenido.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  carrito: Carrito[] = []
  uid: string | undefined
  aux: any
  doc:string | undefined
  constructor(private login_service: LoginService, private contenido_service: ContenidoService) {
    this.login_service.getUser().subscribe((user) => {
      this.uid = user?.uid
      this.cargarData()
      this.contenido_service.buscarIdCarrito(this.uid).subscribe((data)=>{
        this.doc = data.docs[0].id;
      })
    })
  }


  cargarData() {
    if (this.uid != undefined) {
      this.contenido_service.buscarCarrito(this.uid).subscribe((data) => {
        this.aux = data;
        this.carrito = this.aux;
      })
    }
  }

  onRemove(indice:number){
    this.carrito[0].productos.producto.splice(indice,1);
    this.carrito[0].total = 0;
    this.carrito[0].productos.producto.forEach((producto)=>{
      this.carrito[0].total += producto.precio;
    })
    this.actualizarCarrito();
    
  }

  onSum(indice:number,op:string){
    if(op == "+"){
      this.carrito[0].total += this.carrito[0].productos.producto[indice].precio;
      this.carrito[0].productos.producto[indice].cantidad += 1
      this.actualizarCarrito();
    }else{
      if(this.carrito[0].productos.producto[indice].cantidad - 1 == 0){
        alert("No se puede restar")
      }else{
        this.carrito[0].total -= this.carrito[0].productos.producto[indice].precio;
        this.carrito[0].productos.producto[indice].cantidad -= 1
        this.actualizarCarrito();
      }
     
    }
  }

  actualizarCarrito(){
    if(this.doc != undefined && this.doc != ""){
      this.carrito[0].total = Number(this.carrito[0].total.toFixed(2)) 
      this.contenido_service.agregarCarrito('carrito',this.doc,this.carrito[0]);
    }
  }

  onPaypal(){
    
  }
}
