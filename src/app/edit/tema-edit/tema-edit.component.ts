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
  tema: Tema = new Tema();


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit(): void {


    if (environment.token == '') {
      this.alertas.showAlertDanger("sessão expirada");
      this.router.navigate(['/entrar'])
    }
    let id: number = this.route.snapshot.params['id']
    this.findByTema(id)
  }




  findByTema(id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp;
    })
  }


 updateTema() {
  if (this.tema.nome == null || this.tema.descricao == null || this.tema.nome.length <1 || this.tema.descricao.length <1) {
    this.alertas.showAlertDanger("voce tem que preencher os campos!")

  } else {
      this.temaService.editTema(this.tema).subscribe((resp: Tema) => {
        this.tema = resp;
        this.alertas.showAlertSuccess("tema atualizado com sucesso")
        this.router.navigate(['/tema'])
      })
    }

  }

}
