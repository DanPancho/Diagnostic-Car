import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectronicaComponent } from './private/components/electronica/electronica.component';
import { HomeComponent } from './private/home/home.component';
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
      {path: "audio",component:ElectronicaComponent},
      {path: "video", component:ElectronicaComponent},
      {path: "alarmas", component: ElectronicaComponent},
      {path: "scanner", component: ElectronicaComponent},
      {path: "diagnosticos", component: ElectronicaComponent},
      {path: "luces", component: ElectronicaComponent},
      {path: "adaptadores", component: ElectronicaComponent}
    ]
  },
  {
    path:"**", redirectTo: "auth/login"
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
