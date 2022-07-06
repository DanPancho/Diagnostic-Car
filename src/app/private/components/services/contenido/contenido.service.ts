import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Carrito } from '../../interfaces/contenido';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  constructor(private firestore:AngularFirestore) { }

  obtenerContenido(coleccion:string){
    return this.firestore.collection(coleccion).valueChanges();
  }

  buscarIdProducto(coleccion:string,name:string){
    return this.firestore.collection(coleccion,ref=>ref.where('nombre','==',name)).get()
  }
  async agregarCarrito(coleccion:string,productoN:Carrito){
    return await this.firestore.collection(coleccion).add(productoN)
  }
}
