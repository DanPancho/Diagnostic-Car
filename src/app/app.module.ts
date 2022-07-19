import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './public/login/login.component';
import { HomeComponent } from './private/home/home.component';
import { NavegacionComponent } from './private/navegacion/navegacion.component';
import { BarralateralComponent } from './private/components/barralateral/barralateral.component';

// Formulario
import { ReactiveFormsModule } from '@angular/forms';

// firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { ElectronicaComponent } from './private/components/electronica/electronica.component';
import { ContenidoComponent } from './private/components/contenido/contenido.component';
import { CarritoComponent } from './private/components/carrito/carrito.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavegacionComponent,
    BarralateralComponent,
    ElectronicaComponent,
    ContenidoComponent,
    CarritoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
