import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-sobre-nos',
  templateUrl: './sobre-nos.component.html',
  styleUrls: ['./sobre-nos.component.css']
})
export class SobreNosComponent implements OnInit {

  constructor(
    private alertas: AlertasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (environment.token == '') {
      this.alertas.showAlertDanger('sessão expirada');
      this.router.navigate(['/entrar'])
    }

  }

}
