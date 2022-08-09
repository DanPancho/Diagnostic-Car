import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/public/services/login/login.service';
import { ContenidoService } from '../components/services/contenido/contenido.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user: User | undefined;
  descripcion1: boolean;
  descripcion2: boolean;
  descripcion3: boolean;
  constructor(private login_service: LoginService, private router: Router, private contenido_service: ContenidoService) {
    let subs = this.login_service.getUser().subscribe((data) => {
      this.user = {
        uid: data?.uid,
        img_url: data?.photoURL,
        name: data?.displayName
      }
      this.validacionCarrito();
      subs.unsubscribe();
    })
    this.descripcion1 = false;
    this.descripcion2 = false;
    this.descripcion3 = false;
  }
  validacionCarrito() {
    let subscripcion = this.contenido_service.buscarCarrito(this.user?.uid).subscribe((data) => {
      if (data.length == 0) {
        this.contenido_service.crearCarrito({
          estado: false,
          productos: {
            producto: []
          },
          total: 0,
          userid: this.user?.uid
        })
      }
      subscripcion.unsubscribe();
    })
  }

  onMove(direccion: string) {
    this.router.navigate([direccion]);
  }


}
