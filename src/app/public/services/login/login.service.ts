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

  async loginGoogle(){
    let response: Response;
    try{
      await this.authF.signInWithPopup(new this.authfirebase.GoogleAuthProvider())
      return response = {
        status: 200,
        message: "Se logro iniciar sesion con exito!",
        date: new Date()
      }
    }catch(e){
      return response = {
        status: 405,
        message: "No se pudo crear el nuevo usuario",
        date: new Date()
      }
    }
  }

  async loginFacebook(){
    let response: Response;
    try{
      await this.authF.signInWithPopup(new this.authfirebase.FacebookAuthProvider())
      return response = {
        status: 200,
        message: "Se logro iniciar sesion con exito!",
        date: new Date()
      }
    }catch(e){
      return response = {
        status: 405,
        message: "No se pudo crear el nuevo usuario",
        date: new Date()
      }
    }
  }
  async createUser(newEmail: Login):Promise<Response>{
    let response:Response;
    try{
      console.log(newEmail)
      await this.authF.createUserWithEmailAndPassword(newEmail.email, newEmail.pass);
      response = {
        status: 200,
        message: "Se logro crear con exito el nuevo usuario!",
        date: new Date()
      }
      return response
    }catch(e){  
      response = {
        status: 403,
        message: "No se pudo crear el nuevo usuario",
        date: new Date()
      }
      return response;
    }
  }

  async loginEmail(newEmail: Login):Promise<Response>{
    let response:Response;
    try{
      await this.authF.signInWithEmailAndPassword(newEmail.email, newEmail.pass);
      response = {
        status: 200,
        message: "Se logro iniciar sesion con exito!",
        date: new Date()
      }
      return response
    }catch(e){
      
      response = {
        status: 404,
        message: "No se pudo iniciar sesion",
        date: new Date()
      }
      return response;
    }
  }

  getUser(){
    return this.authF.authState;
  }

  logout(){
    return this.authF.signOut();
  }
}

