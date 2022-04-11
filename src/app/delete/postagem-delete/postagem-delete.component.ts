import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { AlertasService } from 'src/app/service/alertas.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem();
  idPostagem: number

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private PostagemService: PostagemService,
    private alertas: AlertasService
  ) { }

  ngOnInit(): void {

    if (environment.token == '') {
      this.alertas.showAlertDanger("sessão expirada");
      this.router.navigate(['/entrar'])
    }

    this.idPostagem = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPostagem);
 
  }


  findByIdPostagem(id: number) {
    this.PostagemService.getByIdPost(id).subscribe((resp: Postagem) => {
      this.postagem = resp;
    })
  }


  deletarPostagem() {
    this.PostagemService.deletePost(this.idPostagem).subscribe(() => {
      this.alertas.showAlertSuccess("Postagem apagado com sucesso")
      this.router.navigate(['/inicio'])
    })



  }



}
