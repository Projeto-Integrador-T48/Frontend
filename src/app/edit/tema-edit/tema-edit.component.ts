import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {
  tema: Tema = new Tema ()
  constructor(
    private temaService: TemaService,
    private router: Router,
    private raute: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
    let id = this.raute.snapshot.params['id']
    this.findByIdTema(id)
    
  }

 
  findByIdTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema)=> {
      this.tema = resp
    })
  }

  atualizar(){
    this.temaService.putTema(this.tema).subscribe({
      next:(resp: Tema)=>{
      this.tema = resp
      this.alertas.showAlertSuccess('Tema atualizado com sucesso!')
      this.router.navigate(['/tema'])
      },
      error:(erro)=>{
        if(erro.status == 400){
          this.alertas.showAlertDanger('Não é possivel alterar tema que já tenha postagem')
        }
      },
      
    })
  }

}
