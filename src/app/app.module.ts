import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { OdsComponent } from './ods/ods.component';
import { RodapeComponent } from './rodape/rodape.component';
import { IdealizadoresComponent } from './idealizadores/idealizadores.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { AtualizarComponent } from './atualizar/atualizar.component';
import { NossaMissaoComponent } from './nossa-missao/nossa-missao.component';
import { TemaComponent } from './tema/tema.component';
import { FeedComponent } from './feed/feed.component';
import { MenuUsuarioComponent } from './menu-usuario/menu-usuario.component';
import { PostagemComponent } from './postagem/postagem.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastrarComponent,
    CabecalhoComponent,
    OdsComponent,
    RodapeComponent,
    IdealizadoresComponent,
    InicioComponent,
    LoginComponent,
    MenuComponent,
    AtualizarComponent,
    NossaMissaoComponent,
    TemaComponent,
    FeedComponent,
    MenuUsuarioComponent,
    PostagemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
