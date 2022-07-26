import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/public/services/login/login.service';
import { Carrito } from '../interfaces/contenido';
import { ContenidoService } from '../services/contenido/contenido.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from 'src/environments/environment';
import { Amount, Item } from '../interfaces/paypal';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: Carrito[] = []
  uid: string | undefined
  aux: any
  doc: string | undefined
  public payPalConfig?: IPayPalConfig;
  item: Item[] = []
  amount: Amount
  longitud:number
  constructor(private login_service: LoginService, private contenido_service: ContenidoService) {
    this.amount = {
      currency_code: '',
      value: '',
      breakdown: {
        item_total: {
          currency_code: '',
          value: ''
        }
      }
    }
    this.longitud = 0;
    this.login_service.getUser().subscribe((user) => {
      this.uid = user?.uid
      this.cargarData()
      this.contenido_service.buscarIdCarrito(this.uid).subscribe((data) => {
        this.doc = data.docs[0].id;
        this.onPaypal()
      })
    })
  }
  ngOnInit(): void {
    this.initConfig();
    let sub_re = this.contenido_service.$lipiarCarrito.subscribe(()=>{
      if(this.doc!=undefined){
        this.carrito[0].estado = false;
        this.carrito[0].productos.producto = [];
        this.carrito[0].total = 0;
        this.contenido_service.agregarCarrito("carrito",this.doc,this.carrito[0]).then(()=>{
          alert("Reservacion Completada");
        }).finally(()=>{
          sub_re.unsubscribe() 
        })
      }
      
    })
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: environment.clientId,
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: this.amount,
          items: this.item
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (_data, actions) => {
        actions.order.get().then(() => {
          // Cambiar estado del carrito
          if (this.doc != undefined && this.doc != "") {
            this.carrito[0].estado = true;
            this.contenido_service.agregarCarrito('carrito', this.doc, this.carrito[0]);
          }
         
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: () => {
        alert("PAGO CANCELADO")
      },
      onError: () => {
        alert("ERROR")
      }
    };
  }
  cargarData() {
    if (this.uid != undefined) {
      this.contenido_service.buscarCarrito(this.uid).subscribe((data) => {
        this.aux = data;
        this.carrito = this.aux;
        this.longitud = this.carrito[0].productos.producto.length;
      })
    }
  }

  onRemove(indice: number) {
    this.carrito[0].productos.producto.splice(indice, 1);
    this.carrito[0].total = 0;
    this.carrito[0].productos.producto.forEach((producto) => {
      this.carrito[0].total += producto.precio;
    })
    this.actualizarCarrito();
    this.onPaypal();

  }

  onSum(indice: number, op: string) {
    if (op == "+") {
      this.carrito[0].total += this.carrito[0].productos.producto[indice].precio;
      this.carrito[0].productos.producto[indice].cantidad += 1
      this.actualizarCarrito();
      this.onPaypal();
    } else {
      if (this.carrito[0].productos.producto[indice].cantidad - 1 == 0) {
        alert("No se puede restar")
      } else {
        this.carrito[0].total -= this.carrito[0].productos.producto[indice].precio;
        this.carrito[0].productos.producto[indice].cantidad -= 1
        this.actualizarCarrito();
        this.onPaypal();
      }

    }
  }
  restartPaypal(){
    this.item = [];
  }
  onPaypal() {
    this.restartPaypal();
    this.carrito[0].productos.producto.forEach((producto) => {
      this.item.push({
        name: producto.nombre,
        quantity: producto.cantidad.toString(),
        unit_amount: {
          value: producto.precio.toString(),
          currency_code: "USD",
        }
      })
    })
    this.amount = {
      currency_code: "USD",
      value: this.carrito[0].total.toString(),
      breakdown: {
        item_total: {
          currency_code: "USD",
          value: this.carrito[0].total.toString()
        }
      }
    }
  }
  actualizarCarrito() {
    if (this.doc != undefined && this.doc != "") {
      this.carrito[0].total = Number(this.carrito[0].total.toFixed(2))
      this.contenido_service.agregarCarrito('carrito', this.doc, this.carrito[0]);
    }
  }
}
