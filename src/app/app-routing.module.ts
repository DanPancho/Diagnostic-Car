import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './private/components/carrito/carrito.component';
import { ContenidoComponent } from './private/components/contenido/contenido.component';
import { ElectronicaComponent } from './private/components/electronica/electronica.component';
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
        path: "audio",component:ElectronicaComponent, children:[
        {
          path: "parlantes", component: ContenidoComponent
        },
        {
          path: "amplificadores", component: ContenidoComponent
        },
        {
          path: "cajas", component: ContenidoComponent
        }
      ]},
      {
        path: "video", component:ElectronicaComponent},
      {
        path: "alarmas", component: ElectronicaComponent},
      {
        path: "scanner", component: ElectronicaComponent},
      {
        path: "diagnosticos", component: ElectronicaComponent},
      {
        path: "luces", component: ElectronicaComponent},
      {
        path: "adaptadores", component: ElectronicaComponent
      }
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
