import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuario:Usuario=new Usuario();
  listaUsuarios:Usuario[]
  
  
    constructor(
      private router:Router,
      private authService:AuthService,
      private alertas: AlertasService
    ) { }


    key='id';
    reverse:true;
  
    ngOnInit(): void {
      
   
      if (environment.token == '') {
        this.alertas.showAlertDanger("sessão expirada");
        this.router.navigate(['/entrar'])
      }
  
    
      this.findAllUsuarios();
    }
  
    findAllUsuarios() {
      this.authService.getAllUsers().subscribe((resp: Usuario[]) => {
        this.listaUsuarios = resp
      })
    }
  
  }
  