import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUser = environment.id

  postagem: Postagem = new Postagem()
  idPost: number
  foto = environment.foto
  nome= environment.nome  

  constructor(
    private router: Router,
    private authService: AuthService,
    private postagemService: PostagemService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
     this.alertas.showAlertInfo('Sua seção expirou, faça o login novamente.')
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

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  idPostagem(id: number){
    this.idPost = id

    this.findByIdPostagem(this.idPost)
  }

  apagar(){
    this.postagemService.deletePostagem(this.idPost).subscribe(()=>{
      this.alertas.showAlertSuccess('Postagem apagada com sucesso!')
      this.findByIdUser()
      //this.router.navigate['/minhas-postagens']
    })
  } 

}
