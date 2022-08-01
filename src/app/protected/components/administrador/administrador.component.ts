import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/public/services/login/login.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent {

  constructor(private login_service:LoginService,private router:Router) { }


  onMove(dir:string){
    this.router.navigate([dir]);
  }

  onLogout(){
    this.login_service.logout().then(()=>{
      this.router.navigate(['auth/login'])
    })
  }
}
