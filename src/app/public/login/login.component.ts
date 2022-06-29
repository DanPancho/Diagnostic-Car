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
      if(!this.verificacionStatus(response.status)){
        alert("No se pudo iniciar sesion...")
      }else{
        this.router.navigate(['home']);
      }
    });
  }
  onFacebook(){
    this.login_service.loginFacebook().then((response)=>{
      if(!this.verificacionStatus(response.status)){
        alert("No se pudo iniciar sesion...")
      }else{
        this.router.navigate(['home']);
      }
    });
  }

  onSubmit(){
    const login:Login = this.form.value;
    // Funcion con login
    if(this.btn1){
      // Login
      this.login_service.loginEmail(login).then((response)=>{
        if(!this.verificacionStatus(response.status)){
          alert("No se pudo iniciar sesion...")
        }else{
          this.router.navigate(['home']);
        }
      })
    }else{
      // Registro
      this.login_service.createUser(login).then((response)=>{
        if(!this.verificacionStatus(response.status)){
          alert("No se pudo crear el usuario...")
        }else{
          // activar login
          this.onChange2();
        }
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
}
