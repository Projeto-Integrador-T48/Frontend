import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { OdsComponent } from './ods/ods.component';
import { RodapeComponent } from './rodape/rodape.component';
import { IdealizadoresComponent } from './idealizadores/idealizadores.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { AtualizarComponent } from './atualizar/atualizar.component';


@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    OdsComponent,
    RodapeComponent,
    IdealizadoresComponent,
    InicioComponent,
    LoginComponent,
    MenuComponent,
    AtualizarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
