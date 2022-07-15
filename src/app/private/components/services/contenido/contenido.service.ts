import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Carrito } from '../../interfaces/contenido';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  constructor(private firestore: AngularFirestore) { }

  obtenerContenido(coleccion: string) {
    return this.firestore.collection(coleccion).valueChanges();
  }

  buscarIdProducto(coleccion: string, name: string) {
    return this.firestore.collection(coleccion, ref => ref.where('nombre', '==', name)).get()
  }

  buscarIdCarrito(uid:string | undefined){
    return this.firestore.collection('carrito',ref => ref.where("userid","==",uid)).get()
  }

  agregarCarrito(coleccion: string,documento:string, productoN: Carrito) {
    return  this.firestore.collection(coleccion).doc(`${documento}`).update(productoN)
  }

  obtenerProductosCliente(userId:string | undefined){
    return this.firestore.collection('carrito',ref => ref.where('userid','==',userId)).valueChanges();
  }

  crearCarrito(nuevoCarrito:Carrito){
    return this.firestore.collection('carrito').add(nuevoCarrito);
  } 

  buscarCarrito(uid:string){
    return this.firestore.collection('carrito',ref => ref.where('userid','==',uid)).valueChanges();
  }

}
