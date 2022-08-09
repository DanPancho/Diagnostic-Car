import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './public/login/login.component';
import { HomeComponent } from './private/home/home.component';
import { NavegacionComponent } from './private/navegacion/navegacion.component';
import { BarralateralComponent } from './private/components/barralateral/barralateral.component';
import { ElectronicaComponent } from './private/components/electronica/electronica.component';
import { ContenidoComponent } from './private/components/contenido/contenido.component';
import { CarritoComponent } from './private/components/carrito/carrito.component';
import { ReservaComponent } from './private/components/reserva/reserva.component';
import { NgxPayPalModule } from 'ngx-paypal';
// Formulario
import { ReactiveFormsModule } from '@angular/forms';

// firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { AdministradorComponent } from './protected/components/administrador/administrador.component';
import { PedidosComponent } from './protected/components/pedidos/pedidos.component';
import { MecanicaComponent } from './private/components/mecanica/mecanica.component';
import { SlideServiciosComponent } from './private/components/slide-servicios/slide-servicios.component';

// swiper
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavegacionComponent,
    BarralateralComponent,
    ElectronicaComponent,
    ContenidoComponent,
    CarritoComponent,
    ReservaComponent,
    AdministradorComponent,
    PedidosComponent,
    MecanicaComponent,
    SlideServiciosComponent,
  ],
  imports: [
    BrowserModule,
    NgxPayPalModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
