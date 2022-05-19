import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackToTopComponent } from './back-to-top/back-to-top.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { UsuarioEditComponent } from './edit/usuario-edit/usuario-edit.component';
import { FeedComponent } from './feed/feed.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { MenuUsuarioComponent } from './menu-usuario/menu-usuario.component';
import { MenuComponent } from './menu/menu.component';
import { PostagemComponent } from './postagem/postagem.component';
import { TemaComponent } from './tema/tema.component';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'menu', component: MenuComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'entrar', component: LoginComponent },
  {path: 'cadastrar', component: CadastrarComponent},
  {path: 'tema', component: TemaComponent},
  {path: 'feed', component: FeedComponent},
  {path: 'menu-usuario', component: MenuUsuarioComponent},
  {path: 'minhas-postagens', component: PostagemComponent},
  {path: 'back-to-top', component: BackToTopComponent},
  {path: 'tema-edit/:id', component: TemaEditComponent},
  {path: 'tema-delete/:id', component: TemaDeleteComponent},
  {path: 'postagem-edit/:id', component: PostagemEditComponent},
  {path: 'usuario-edit/:id', component: UsuarioEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
