import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem()

  valor: string

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdPostagem(id)
    this.findAllTemas()
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.idTema = this.postagem.tema.id
      this.valor = this.postagem.valor
      
      let inputValor = (<HTMLInputElement>document.querySelector('#inputValorDefault'))

      switch (this.valor) {
        
        case "gratis":

          inputValor.innerText = "Gratuito"

          break;

        case "$":

          inputValor.innerText = "de R$ 1 - R$ 99"

          break;

        case "$$":

          inputValor.innerText = "de R$ 100 - R$ 499"

          break;

        case "$$$":

          inputValor.innerText = "Acima de R$ 500"

          break;
      
        default:

          inputValor.innerText = "Selecione o valor"

          break;
      }

    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
  }

  atualizar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagem.valor = this.valor

    this.postagemService.putPostagem(this.postagem).subscribe({
      next:(resp: Postagem) => {
      this.postagem = resp
     this.alertas.showAlertSuccess('Postagem atualizada com sucesso!')
      this.router.navigate(['minhas-postagens'])
      },
      error: (erro) => {
        if(erro.status == 500){
          this.alertas.showAlertInfo('Preencha todos os campos para editar sua postagem')
        }
      }
    })
  }

  setValor(event: any) {
    this.valor = event.target.value;
  }

}
