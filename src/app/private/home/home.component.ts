import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/public/services/login/login.service';
import { user } from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:user | undefined;
  descripcion1:boolean;
  descripcion2:boolean;
  descripcion3:boolean;
  constructor(private login_service: LoginService, private router: Router) {
    this.login_service.getUser().subscribe((data)=>{
      this.user = {
        uid: data?.uid,
        img_url: data?.photoURL,
        name: data?.displayName
      }
    })
    this.descripcion1 = false;
    this.descripcion2 = false;
    this.descripcion3 = false;
  }

  ngOnInit(): void {
  }

  modalElec(dato:number){
    if(dato == 1){
      this.descripcion1 = true;
    }else if(dato == 2){
      this.descripcion2 = true;
    }else if(dato == 3){
      this.descripcion3 = true;
    }
    
  }
  descModal(dato:number){
    if(dato == 1){
      this.descripcion1 = false;
    }else if(dato == 2){
      this.descripcion2 = false;
    }else if(dato == 3){
      this.descripcion3 = false;
    }
  }
  onElectronica(){
    this.router.navigate(['electronica']);
  }
}
