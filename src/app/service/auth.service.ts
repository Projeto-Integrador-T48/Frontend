import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>(
      'https://conectagen.herokuapp.com/usuario/logar',
      usuarioLogin
    );
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(
      'https://conectagen.herokuapp.com/usuario/cadastrar',
      usuario
    );
  }

  getByIdUser(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`https://conectagen.herokuapp.com/usuario/${id}`, this.token)
  }
  
  //lógica para o menu da landing page inicial, esse menu só deve aparecer se o user estiver deslogado
  deslogado() {
    let ok = false;
    if (environment.token == '') {
      ok = true;
    }
    return ok;
  }

  logado() {
    let ok = false;
    if (environment.token != '') {
      ok = true;
    }
    return ok;
  }
}
