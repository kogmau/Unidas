import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario();

  confirmSenha: string;

  tipoUsuario: string = 'normal';

  contagem: number = 255;
  num: number = 255;

  areatext: string;
  areatextsize: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  confirmarSenha(event: any) {
    this.confirmSenha = event.target.value
  }


  desc(event: any) {
    let value = event.target.value.length

    let char = event.keyCode

    this.areatext = ((document.getElementById("desc") as HTMLInputElement).value);
    this.areatextsize = ((document.getElementById("desc") as HTMLInputElement).value.length);



    if (char >= 41 && char <= 126) {
      if (value > 0 && value < 255) {
        this.num = this.contagem - this.areatextsize;

      }
    }

    if (char == 8) {
      this.num++;
      if (value < 1) {
        this.num = 255;
      }
    }

    if (value > 254) {
      this.num = 0;
    }



    if (char == 32) {
      this.num--
    }


  }


  cadastrarUsuario() {

    if (this.usuario.foto == null || this.usuario.foto.length < 8) {
      this.usuario.foto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDinLQGQ8fa-8DwHRxeCxmlddb7Om-RDDWHw&usqp=CAU";
    }


    if (this.areatext == null || this.areatext.length < 1) {
      this.areatext = "edite sua descricao no botão abaixo...";
    }


    if (this.usuario.nome == null || this.usuario.usuario == null || this.usuario.senha == null) {
      this.alertas.showAlertDanger("preencha todos os campos corretamente!")
    } else if (this.usuario.senha.length < 6) {
      this.alertas.showAlertDanger("minimo de caracters na senha é 6")
    } else {
      if (this.confirmSenha === this.usuario.senha) {

        this.usuario.tipo = this.tipoUsuario;

        this.usuario.descricao = this.areatext;

        this.authService.Cadastrar(this.usuario).subscribe((resp: Usuario) => {
          this.usuario = resp;
          this.router.navigate(['/entrar']);
          this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!');
        });
      } else {
        this.alertas.showAlertDanger('As senha não estão iguais.');
      }

    }


  }
}