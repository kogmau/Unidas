import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  nome:string;
  assunto:string;
  mensagem:string;




  constructor(
    private alertas:AlertasService,
    private router:Router
  ) { }

  ngOnInit(): void {

    if (environment.token == '') {
       this.alertas.showAlertDanger('sessão expirada');
       this.router.navigate(['/entrar'])
    }

  }


enviar(){
  if(this.nome==null || this.assunto==null || this.mensagem==null){
      this.alertas.showAlertDanger("preencha os campos")
  }
  if(this.nome.length<1 || this.assunto.length<1 || this.mensagem.length<1){
      this.alertas.showAlertDanger("preencha os campos")
  }

}

}
