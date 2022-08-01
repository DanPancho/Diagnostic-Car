import { Component } from '@angular/core';
import { LoginService } from 'src/app/public/services/login/login.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { ContenidoService } from '../components/services/contenido/contenido.service';
@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent{

  user:User|undefined;
  ruta:string
  barra:boolean
  constructor(private login_service:LoginService,private contenido_service:ContenidoService,private router:Router) {
    this.login_service.getUser().subscribe((data)=>{
      this.user = {
        uid: data?.uid,
        img_url: data?.photoURL,
        name: data?.displayName
      }
    })
    this.ruta = this.router.url;
    this.barra = false;
    this.contenido_service.$activarBarraLateral.subscribe(data=>{
      this.barra = data
    })
  }
  onLogout(){
    this.login_service.logout()
    this.router.navigate(['auth/login'])

  }

  activarBarraLateral(valor:boolean){
    this.contenido_service.$activarBarraLateral.emit(valor)
  }
  onMove(){
    this.router.navigate(['home'])
  }
}
