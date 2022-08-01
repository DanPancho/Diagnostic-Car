import { Component, OnInit } from '@angular/core';
import { Recervacion } from 'src/app/private/components/interfaces/reservacion';
import { CrudService } from '../../services/crud/crud.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  reservaciones:Recervacion[] = []
  aux:any
  constructor(private crud_service:CrudService) { }

  ngOnInit(): void {
    this.crud_service.obtener("recervaciones").subscribe((data)=>{
      this.aux = data;
      this.reservaciones = this.aux;
    })
  }

}
