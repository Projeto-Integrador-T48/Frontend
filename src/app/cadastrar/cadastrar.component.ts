import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})
export class CadastrarComponent implements OnInit {
  usuario: Usuario = new Usuario();
  confirmarSenha: string;
  tipodeUsuario: string;
  isLoading = false

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  cadastrar() {
    this.isLoading = true
    this.usuario.tipo = this.tipodeUsuario;
    if (this.usuario.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger('As senhas estão incorretas');   
      this.isLoading = false       
    } if(this.usuario.tipo == null) {
      this.alertas.showAlertDanger('Selecione um tipo de usuário')
      this.isLoading =false;
    }
    else {
      this.auth.cadastrar(this.usuario).subscribe({
        next:(resp: Usuario) => {
        this.usuario = resp;
        this.router.navigate(['/entrar']);
        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso');
        },
        error: (erro) => {
          if(erro.status == 400 || this.usuario.nome == undefined)
         this.alertas.showAlertDanger('Preencha todos os campos antes de fazer um cadastro')
          this.isLoading = false  
        }

      });
      
    }
    // this.isLoading = false
  }
  validaNome() {
    let txtNome = <HTMLLabelElement>document.querySelector('#txtNome');
    let nome = <HTMLInputElement>document.querySelector('#nome');

    if (nome.value.length > 0) {
      txtNome.style.color = '#198754';
      nome.style.borderColor = '#198754';
      txtNome.innerHTML = 'Senha válida';
    } else {
      txtNome.style.color = '#dc3545';
      nome.style.borderColor = '#dc3545 ';
      txtNome.innerHTML = 'Senha inválida';
    }
  }

  tipoUsuario(event: any) {
    this.tipodeUsuario = event.target.value;
  }

  validaEmail() {
    let regex = '[a-z0-9]+@[a-z]+.[a-z]{2,3}';
    let txtEmail = <HTMLLabelElement>document.querySelector('#txtEmail');
    let email = <HTMLInputElement>document.querySelector('#usuario');
    if (this.usuario.usuario.match(regex)) {
      txtEmail.innerHTML = 'Email válido';
      txtEmail.style.color = '#198754';
      email.style.border = 'solid 1px #198754';
    } else {
      txtEmail.innerHTML = 'Email inválido';
      txtEmail.style.color = '#dc3545';
      email.style.border = 'solid 1px #dc3545';
    }
  }

  validaSenha() {
    let senhaLabel = <HTMLLabelElement>document.querySelector('#senhaLabel');
    let senhaInput = <HTMLInputElement>document.querySelector('#senha');
    let aviso = <HTMLSpanElement>document.querySelector('#aviso')

    if (senhaInput.value.length > 4) {
      senhaLabel.style.color = '#198754';
      senhaInput.style.borderColor = '#198754';
      senhaLabel.innerHTML = 'Senha válida';
      aviso.innerHTML ='';
    } else {
      senhaLabel.style.color = '#dc3545';
      aviso.style.color ="#dc3545"
      senhaInput.style.borderColor = '#dc3545 ';
      senhaLabel.innerHTML = 'Senha inválida';
      senhaLabel.style.color = '#dc345'
      aviso.innerHTML = "a senha deve ser acima de 4 caracteres"
    }
  }

  validaConfirmaSenha() {
    let senhaLabel = <HTMLLabelElement>document.querySelector('#senhaLabel2');
    let senhaInput = <HTMLInputElement>document.querySelector('#confirmaSenha');
    this.usuario.tipo = this.tipodeUsuario;
    
    if (senhaInput.value.length > 4 && this.usuario.senha == this.confirmarSenha ) {
      senhaLabel.style.color = '#198754';
      senhaInput.style.borderColor = '#198754';
      senhaLabel.innerHTML = 'Senha válida';
    } else {
      senhaLabel.style.color = '#dc3545';
      senhaInput.style.borderColor = '#dc3545 ';
      senhaLabel.innerHTML = 'Senhas diferentes';
    }
  }
}