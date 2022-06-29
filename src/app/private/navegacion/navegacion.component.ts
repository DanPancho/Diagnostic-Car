import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/public/services/login/login.service';
import { Router } from '@angular/router';
import { user } from '../interfaces/user';
@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent{

  user:user|undefined;
  constructor(private login_service:LoginService,private router:Router) {
    this.login_service.getUser().subscribe((data)=>{
      this.user = {
        uid: data?.uid,
        img_url: data?.photoURL,
        name: data?.displayName
      }
    })
  }
  onLogout(){
    this.login_service.logout()
    this.router.navigate(['auth/login'])
  }
}
