import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Login } from '../interfaces/login';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  texto_init:string;
  btn1:boolean;
  btn2:boolean;
  constructor(private login_service: LoginService, private router: Router) {
    this.texto_init = "Bienvenido!"
    this.btn1 = true;
    this.btn2 = false;
  }

  form = new FormGroup({
    email: new FormControl(),
    pass: new FormControl()
  })


  onGoogle(){
    this.login_service.loginGoogle().then((response)=>{
      this.repuestaStatus(response.status,"l")
    });
  }
  onFacebook(){
    this.login_service.loginFacebook().then((response)=>{
      this.repuestaStatus(response.status,"l")
    });
  }

  onSubmit(){
    const login:Login = this.form.value;
    // Funcion con login
    if(this.btn1){
      // Login
      this.login_service.loginEmail(login).then((response)=>{
        this.repuestaStatus(response.status,"l")
      })
    }else{
      // Registro
      this.login_service.createUser(login).then((response)=>{
        this.repuestaStatus(response.status,"r")
      })
     
    }
  }

  onChange(){
    this.texto_init = "Registro..."
    this.btn1 = false;
    this.btn2 = true;
  }
  onChange2(){
    this.texto_init = "Bienvenido!"
    this.btn1 = true;
    this.btn2 = false;
  }

  verificacionStatus(status:number):boolean{
    if(status != 200){
      return false;
    }
    return true;
  }

  repuestaStatus(status:number,accion:string){
    if(!this.verificacionStatus(status)){
      this.validacionAccion(accion);
    }else{
      this.onMove(accion)
    }
  }

  validacionAccion(accion:string){
    if(accion == "l"){
      alert("No se pudo iniciar sesion...")
    }else{
      alert("No se pudo crear el usuario...")
    }
  }

  onMove(accion:string){
    if(accion == "l"){
      this.router.navigate(['home']);
    }else{
      this.onChange2();
    }
  }
}
