import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil-edit.component.html',
  styleUrls: ['./perfil-edit.component.css']
})
export class PerfilEditComponent implements OnInit {
  usuario: Usuario = new Usuario();

  postagem: Postagem = new Postagem();
  listaPostagem: Postagem[];

  confirmarSenha: string;
  contagem: number = 255;
  num: number = 255;

  areatext: string;
  areatextsize: number;

  idUser: number;

  constructor(
    private authService: AuthService,
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService

  ) { }


  ngOnInit(): void {
    window.scroll(0, 0);


    if (environment.token == '') {
      this.alertas.showAlertDanger("sessão expirada");
      this.router.navigate(['/entrar'])
    }

    

    this.idUser = this.route.snapshot.params['id']

    this.findByIdUsuario(this.idUser);

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


  confirmeSenha(event: any) {
    this.confirmarSenha = event.target.value
  }


  findByIdUsuario(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: Usuario) => {
      this.usuario = resp;
    })
  }



  findAllPost() {
    this.postagemService.getAllPost().subscribe((resp: Postagem[]) => {
      this.listaPostagem = resp;
    })
  }


  altUser() {

    if (this.usuario.foto == null || this.usuario.foto.length < 1) {
      this.usuario.foto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDinLQGQ8fa-8DwHRxeCxmlddb7Om-RDDWHw&usqp=CAU";
    }


    if (this.areatext == null || this.areatext.length < 1) {
      this.areatext = " escreva sobre você...";
    }


    if (this.usuario.nome == null || this.usuario.usuario == null || this.usuario.senha == null) {
      this.alertas.showAlertDanger("Voce deixou algum campo vazio!")
    } else if (this.usuario.senha.length < 6) {
      this.alertas.showAlertDanger("minimo de caracters na senha é 6")
    } else {

      if (this.confirmarSenha == this.usuario.senha) {

        this.usuario.descricao = this.areatext;
        this.usuario.postagem = this.listaPostagem;

        this.authService.putUser(this.usuario).subscribe((resp: Usuario) => {
          this.usuario = resp;

          this.alertas.showAlertSuccess('Perfil alterado com sucesso! logue novamente!');
          this.router.navigate(['/entrar']);
          environment.token = ''
          environment.nome = ''
          environment.descricao = ''
          environment.foto = ''
          environment.id = 0
        });
      } else {
        this.alertas.showAlertDanger("as senhas nao estão iguais!")
      }

    }

  }

}

