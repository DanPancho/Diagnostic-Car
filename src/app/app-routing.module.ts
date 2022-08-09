import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './private/components/carrito/carrito.component';
import { ContenidoComponent } from './private/components/contenido/contenido.component';
import { ElectronicaComponent } from './private/components/electronica/electronica.component';
import { MecanicaComponent } from './private/components/mecanica/mecanica.component';
import { HomeComponent } from './private/home/home.component';
import { AdministradorComponent } from './protected/components/administrador/administrador.component';
import { PedidosComponent } from './protected/components/pedidos/pedidos.component';
import { LoginComponent } from './public/login/login.component';

const routes: Routes = [
  {
    path:"auth/login", component: LoginComponent
  },
  {
    path:"home",component:HomeComponent
  },
  {
    path:"electronica", children: [
      {
        path: "express",component:ElectronicaComponent
      }
    ]
  },
  {
    path:"mecanica",children: [
      {path: "express",component: MecanicaComponent}
    ]
  },
  {
    path: "carrito", component: CarritoComponent
  },
  {
    path: "admin", component: AdministradorComponent,children:[
    {
      path: "reservaciones" , component: PedidosComponent
    }
  ]},
  {
    path:"**", redirectTo: "auth/login"
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
