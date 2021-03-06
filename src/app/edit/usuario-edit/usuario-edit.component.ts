import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css'],
})
export class UsuarioEditComponent implements OnInit {
  usuario: Usuario = new Usuario()
  idUser: number
  confirmarSenha: string
  tipoDeUsuario: string
  foto = environment.foto
  nome= environment.nome  

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    if (environment.token == '') {
      this.router.navigate(['/inicio']);
    }
    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser);
    console.log(this.usuario)
    
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  // validaSenha() {
  //   let txtSenha = <HTMLLabelElement>document.querySelector('#txtSenha');
  //   let senha = <HTMLInputElement>document.querySelector('#senha');
  //   let confSenha = <HTMLInputElement>document.querySelector('#confirmarSenha');

  //   if (this.confirmarSenha == this.usuario.senha) {
  //     txtSenha.innerHTML = 'Confirme sua senha';
  //     senha.style.border = 'solid 1px green';
  //     confSenha.style.border = 'solid 1px green';
  //   } else {
  //     txtSenha.innerHTML = 'Senhas não são identicas!';
  //     senha.style.border = 'solid 1px red';
  //     confSenha.style.border = 'solid 1px red';
  //   }

  // }

  // tipoUsuario(event: any) {
  //   this.tipoDeUsuario = event.target.value;
  // }

  // validaNome() {
  //   let txtNome = <HTMLLabelElement>document.querySelector('#txtNome');
  //   let nome = <HTMLInputElement>document.querySelector('#nome');
  
  //   if (this.usuario.nome.length < 2) {
  //     txtNome.innerHTML = 'Digite um nome válido';
  //     txtNome.style.color = 'red';
  //     nome.style.border = 'solid 1px red';
  //   } else {
  //     txtNome.innerHTML = 'Nome';
  //     txtNome.style.color = 'black';
  //     nome.style.border = 'solid 1px green';
  //   }
  // }

  atualizar() {
    // this.usuario.tipo = this.tipoDeUsuario;
    if (this.usuario.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger('As senhas não são identicas');
    } else { 
      this.usuario.postagem = []     
      this.auth.atualizar(this.usuario).subscribe({
        next: (resp: Usuario) => {
          this.usuario = resp;
          this.alertas.showAlertSuccess(
            'Usuario atualizado com sucesso! Faça login novamente para validar as alterações'
          );
          this.router.navigate(['/entrar']);
          environment.token = '';
          environment.foto = '';
          environment.id = 0;
          environment.nome = '';
          environment.tipo = '';
        },
        error: (erro) => {
          if (erro.status == 400) {
            this.alertas.showAlertDanger('Preencha todos os campos para atualizar seu usuário');
          }
        },
      });
    }
  }

  findByIdUser(id:number) {
    this.auth.getByIdUser(id).subscribe((resp : Usuario) => {
      this.usuario = resp      
      this.usuario.senha = ''
    })
  }
}
