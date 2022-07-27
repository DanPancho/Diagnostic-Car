import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firebase:AngularFirestore) { }

  obtener(coleccion:string){
    return this.firebase.collection(coleccion).valueChanges();
  }
}
