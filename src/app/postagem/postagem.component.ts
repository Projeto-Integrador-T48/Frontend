import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUser = environment.id

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      alert('Sua seção expirou, faça o login novamente.')
      this.router.navigate(['/inicio'])
    }

    this.authService.refreshToken()

    this.findByIdUser()
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp:Usuario) => {
      this.usuario = resp
    })
  }

}
