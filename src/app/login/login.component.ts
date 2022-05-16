import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()
  isLoading = false
  txtBtn: string

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    this.alterTxtBtn()
}

  entrar(){
    this.isLoading = true
    this.alterTxtBtn()
    this.auth.entrar(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLogin) => {
        this.usuarioLogin = resp

        environment.token = this.usuarioLogin.token
        environment.nome = this.usuarioLogin.nome
        environment.foto = this.usuarioLogin.foto
        environment.id = this.usuarioLogin.id

        this.router.navigate(['/feed'])

      }, error: erro =>{
        if(erro.status == 401 || this.usuarioLogin.senha == null || this.usuarioLogin.usuario == null){
          this.alertas.showAlertDanger('Usuário ou senha estão incorretos!')
          this.isLoading = false
          this.alterTxtBtn()
        }
      },
    });
  }
  
  validaEmail(){
    let emailLabel = (<HTMLLabelElement>document.querySelector('#emailLabel'))
    let emailInput = (<HTMLInputElement>document.querySelector('#emailInput'))

    emailInput.style.boxShadow = "0 0 0 0"

    let regex = "[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
    if(this.usuarioLogin.usuario.match(regex)){
      emailLabel.innerHTML = 'Email válido'
      emailLabel.style.color = '#198754'
      emailInput.style.borderColor = '#198754'
      
    }else{
      emailLabel.innerHTML = 'Usuário precisa ser um email válido'
      emailLabel.style.color = '#dc3545'
      emailInput.style.borderColor = '#dc3545'
      
    }
  }

  validaSenha(){
    let senhaLabel = (<HTMLLabelElement>document.querySelector('#senhaLabel'))
    let senhaInput = (<HTMLInputElement>document.querySelector('#senhaInput'))

    senhaInput.style.boxShadow = "0 0 0 0"

    if(senhaInput.value.length > 4){
      senhaLabel.innerHTML = 'Senha válida'
      senhaLabel.style.color = '#198754'
      senhaInput.style.borderColor = '#198754'
      
    }else{
      senhaLabel.innerHTML = 'Senha inválida'
      senhaLabel.style.color = '#dc3545'
      senhaInput.style.borderColor = '#dc3545 '
    }

  }
  
  alterTxtBtn(){
    if(this.isLoading == false){
      this.txtBtn = 'Entrar'
    }else{
      this.txtBtn = 'Carregando'
    }
  }

}
