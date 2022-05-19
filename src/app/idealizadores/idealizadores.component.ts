import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-idealizadores',
  templateUrl: './idealizadores.component.html',
  styleUrls: ['./idealizadores.component.css']
})
export class IdealizadoresComponent implements OnInit {

  usuario: Usuario = new Usuario();

  emailOk: boolean = false
  nomeOk: boolean = false
  assuntoOk: boolean = false

  constructor(private alertas: AlertasService) { }

  ngOnInit(){
    
  }

  validanome(){
    let txtNome = <HTMLLabelElement>document.querySelector('#txtNome');
    let nome = <HTMLInputElement>document.querySelector('#nome');

    nome.style.boxShadow = "0 0 0 0"

    if(this.usuario.nome.length < 2){
      txtNome.innerHTML = 'Digite um nome válido';
      txtNome.style.color = 'red';
      nome.style.border = 'solid 1px red'
      this.nomeOk = false
    }else{
      txtNome.innerHTML = 'Nome';
      txtNome.style.color = 'black';
      nome.style.border = 'solid 1px green';
      this.nomeOk = true
    }
  }

  validaemail(){

    let regex = '[a-z0-9]+@[a-z]+.[a-z]{2,3}';
    let txtEmail = <HTMLLabelElement>document.querySelector('#txtEmail');
    let email = <HTMLInputElement>document.querySelector('#usuario');

    email.style.boxShadow = "0 0 0 0"

    if (this.usuario.usuario.match(regex)) {
      txtEmail.innerHTML = 'e-mail';
      txtEmail.style.color = 'black';
      email.style.border = 'solid 1px green';
      this.emailOk = true
    } else {
      txtEmail.innerHTML = 'e-mail Inválido';
      txtEmail.style.color = 'red'
      email.style.border = 'solid 1px red';
      this.emailOk=false
    }
  }

  validaassunto(){
        let txtassunto = <HTMLLabelElement>document.querySelector('#txtAssunto')
        let assunto = <HTMLTextAreaElement>document.querySelector('#assunto')

        assunto.style.boxShadow = "0 0 0 0"

        if(assunto.value.length < 2){
          txtassunto.innerHTML = 'assunto';
          txtassunto.style.color = 'red';
          assunto.style.border = 'solid 1px red'
          this.assuntoOk = false;
        }else{
          txtassunto.innerHTML = 'assunto';
          txtassunto.style.color = 'black';
          assunto.style.border = 'solid 1px green'
          this.assuntoOk = true
        }
  }
  enviar(){

    if(this.nomeOk == true && this.emailOk == true && this.assuntoOk == true){
      this.alertas.showAlertSuccess("Dados enviados com sucesso")
  }else{
    this.alertas.showAlertDanger("Por favor preencha os dados corretamente")
  }
  }
}
