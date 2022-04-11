import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema= new Tema();
  idTema:number
  
    constructor(
      private route:ActivatedRoute,
      private router:Router,
      private temaService: TemaService,
      private alertas: AlertasService
    ) { }
  
    ngOnInit(): void {
    
    
     
      if (environment.token == '') {
        this.alertas.showAlertDanger("sessão expirada");
        this.router.navigate(['/entrar'])
      }
  
      this.idTema=this.route.snapshot.params['id']
      this.findByIdTema(this.idTema);
    }
  
  
  findByIdTema(id:number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema)=>{
      this.tema=resp;
    })
  }
  
  
  deletarTema(){
    this.temaService.deleteTema(this.idTema).subscribe(()=>{
      this.alertas.showAlertSuccess("tema apagado com sucesso")
      this.router.navigate(['/tema'])
    })
    }
  
  
  
  }
  