import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private router:Router,
    public auth:AuthService
  ) { }

  ngOnInit(): void {
  }


btnSair(){
  this.router.navigate(['/entrar']);
  environment.token=''
  environment.nome=''
  environment.descricao=''
  environment.foto=''
  environment.id=0
}
}
