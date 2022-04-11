import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  nome = environment.nome
  descricao = environment.descricao
  foto = environment.foto


  tema: Tema = new Tema();
  listaTemas: Tema[];
  idTema: number;

  postagem: Postagem = new Postagem();
  tituloPost: string;
  listaPostagem: Postagem[];




  usuario: Usuario = new Usuario();
  idUser = environment.id;



  key = 'data';
  reverse = true;

  constructor(
    private alertas: AlertasService,
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

     if (environment.token == '') {
      this.alertas.showAlertDanger('sessão expirada');
     this.router.navigate(['/entrar'])
     }

    this.findAllPost();
    this.findAllTemas();

    window.scroll(0, 0)


  }


  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    })
  }

  findAllPost() {
    this.postagemService.getAllPost().subscribe((resp: Postagem[]) => {
      this.listaPostagem = resp;
    })
  }


  findByUserId() {
    this.authService.getByIdUser(this.idUser).subscribe((resp: Usuario) => {
      this.usuario = resp;
    })
  }

  findByTituloPostagem() {
    if (this.tituloPost === '') {
      this.findAllPost();
    } else {
      this.postagemService.getByTituloPost(this.tituloPost).subscribe((resp: Postagem[]) => {
        this.listaPostagem = resp;
      })
    }
  }



  publicarPost() {
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;


    this.usuario.id = this.idUser;
    this.postagem.usuario = this.usuario;



    if (this.postagem.titulo == null || this.postagem.descricao == null || this.postagem.tema == null) {
      this.alertas.showAlertDanger("Preencha todos os campos!");
    }

    if (this.postagem.titulo.length < 5) {
      this.alertas.showAlertDanger("Titulo tem que ter no minimo 5 caracters");
    }

    else {

      this.postagemService.createPost(this.postagem).subscribe((resp: Postagem) => {
        this.postagem = resp;
        this.alertas.showAlertSuccess("Publicado com Sucesso!")
        this.findAllPost();
        this.findByUserId();
        this.postagem = new Postagem();
      })


    }

  }




}
