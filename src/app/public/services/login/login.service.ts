import { Injectable } from '@angular/core';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Login } from '../../interfaces/login';
import { Response } from '../../interfaces/response';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authfirebase = firebase.auth;
  login:boolean;
  constructor(private authF: AngularFireAuth) {
    this.login = false;
  }

  async loginGoogle():Promise<Response>{
    try{
      await this.authF.signInWithPopup(new this.authfirebase.GoogleAuthProvider())
      return {
        status: 200,
        message: "Se logro iniciar sesion con exito!",
        date: new Date()
      }
    }catch(e){
      return {
        status: 405,
        message: "No se pudo crear el nuevo usuario",
        date: new Date()
      }
    }
  }

  async loginFacebook():Promise<Response>{
    try{
      await this.authF.signInWithPopup(new this.authfirebase.FacebookAuthProvider())
      return {
        status: 200,
        message: "Se logro iniciar sesion con exito!",
        date: new Date()
      }
    }catch(e){
      return {
        status: 405,
        message: "No se pudo crear el nuevo usuario",
        date: new Date()
      }
    }
  }
  async createUser(newEmail: Login):Promise<Response>{
    try{
      await this.authF.createUserWithEmailAndPassword(newEmail.email, newEmail.pass);
      return {
        status: 200,
        message: "Se logro crear con exito el nuevo usuario!",
        date: new Date()
      }
    }catch(e){  
 
      return {
        status: 403,
        message: "No se pudo crear el nuevo usuario",
        date: new Date()
      };
    }
  }

  async loginEmail(newEmail: Login):Promise<Response>{
    try{
      await this.authF.signInWithEmailAndPassword(newEmail.email, newEmail.pass);
      return {
        status: 200,
        message: "Se logro iniciar sesion con exito!",
        date: new Date()
      }
    }catch(e){

      return {
        status: 404,
        message: "No se pudo iniciar sesion",
        date: new Date()
      };
    }
  }

  getUser(){
    return this.authF.authState;
  }

  logout(){
    return this.authF.signOut();
  }
}

