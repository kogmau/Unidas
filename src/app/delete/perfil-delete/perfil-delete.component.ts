import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-perfil-delete',
  templateUrl: './perfil-delete.component.html',
  styleUrls: ['./perfil-delete.component.css']
})
export class PerfilDeleteComponent implements OnInit {

 
  usuario: Usuario= new Usuario();
  idUsuario:number
  
    constructor(
      private route:ActivatedRoute,
      private router:Router,
      private authService:AuthService,
      private alertas: AlertasService
    ) { }
  
    ngOnInit(): void {
    
    
     
      if (environment.token == '') {
        this.alertas.showAlertDanger("sessão expirada");
        this.router.navigate(['/entrar'])
      }
  
      this.idUsuario=this.route.snapshot.params['id']
      this.findByIdUsuario(this.idUsuario);
    }
  
  
  findByIdUsuario(id:number){
    this.authService.getByIdUser(id).subscribe((resp: Usuario)=>{
      this.usuario=resp;
    })
  
  }
  
  
  deletarUsuario(){
    this.authService.deleteUser(this.idUsuario).subscribe(()=>{
      this.alertas.showAlertSuccess("Usuario apagado com sucesso")
      this.router.navigate(['/usuarios'])
    })  
    }
  
  
  
  }
  