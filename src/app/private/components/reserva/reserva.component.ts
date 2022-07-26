import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { LoginService } from 'src/app/public/services/login/login.service';
import { ContenidoService } from '../services/contenido/contenido.service';
import { Recervacion } from '../interfaces/reservacion';
@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  name:string | null | undefined
  form = new FormGroup({
    fecha: new FormControl(),
    direccion: new FormControl(),
    marca: new FormControl(),
    modelo: new FormControl(),
    celular: new FormControl()
  })
  constructor(private login_service:LoginService, private contenido_service:ContenidoService) {
    this.name = ""
  }

  ngOnInit(): void {
    this.login_service.getUser().subscribe((user)=>{
      this.name = user?.displayName
    })
  }

  onSubmit(){
    const {fecha,direccion,marca,modelo,celular} = this.form.value;
    // validacion de fecha
    if(this.validarFecha(fecha)){
      if(direccion != "" && marca != "" && modelo != "" && celular != "" && this.name != undefined){
        let nuevaRe : Recervacion = { 
          nombre:this.name,
          fecha: fecha,
          pais: "Ecuador",
          ciudad: "Quito",
          direccion: direccion,
          telefono: celular,
          marca: marca,
          modelo: modelo
        }
        this.contenido_service.crearReserva("recervaciones",nuevaRe).then(()=>{
          this.contenido_service.$lipiarCarrito.emit(true);
        })
      }else{
        alert("Campos incompletos");
      }
    }
    

  }

  validarFecha(fecha:Date){
    let actual = new Date()
    let date = new Date(fecha)
    if(date < actual){
      alert("Fecha no valida")
      return false
    }
    return true
  }

}
