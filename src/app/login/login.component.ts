import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)
}

  entrar(){
    this.auth.entrar(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLogin) => {
        this.usuarioLogin = resp

        environment.token = this.usuarioLogin.token
        environment.nome = this.usuarioLogin.nome
        environment.foto = this.usuarioLogin.foto
        environment.id = this.usuarioLogin.id

        this.router.navigate(['/feed'])

      }, error: erro =>{
        if(erro.status == 401){
          alert('Usuário ou senha estão incorretos!')
        }
      },
    });
  }
  
  validaEmail(){
    let emailLabel = (<HTMLLabelElement>document.querySelector('#emailLabel'))
    let emailInput = (<HTMLInputElement>document.querySelector('#emailInput'))

    let regex = "[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
    if(this.usuarioLogin.usuario.match(regex)){
      emailLabel.innerHTML = 'Email'
      emailLabel.style.color = '#03BB85'
      emailInput.style.borderColor = '#03BB85'
    }else{
      emailLabel.innerHTML = 'Usuário precisa ser um email válido'
      emailLabel.style.color = 'red'
      emailInput.style.borderColor = 'red'
    }
  }

  validaSenha(){
    let senhaLabel = (<HTMLLabelElement>document.querySelector('#senhaLabel'))
    let senhaInput = (<HTMLInputElement>document.querySelector('#senhaInput'))

    if(senhaInput.value.length > 0){
      senhaLabel.style.color = '#03BB85'
      senhaInput.style.borderColor = '#03BB85'
      
    }else{
      senhaLabel.style.color = 'red'
      senhaInput.style.borderColor = 'red'
    }

  }
}
