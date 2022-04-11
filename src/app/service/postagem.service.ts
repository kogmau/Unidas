import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }



  getAllPost(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>('https://unidasheroku.herokuapp.com/postagens/', this.token);
  }

  getByTituloPost(titulo: string): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`https://unidasheroku.herokuapp.com/postagens/titulo/${titulo}`, this.token);
  }

  getByIdPost(id: number): Observable<Postagem> {
    return this.http.get<Postagem>(`https://unidasheroku.herokuapp.com/postagens/${id}`, this.token);
  }

  createPost(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>('https://unidasheroku.herokuapp.com/postagens', postagem, this.token)
  }


  editPost(postagem: Postagem): Observable<Postagem> {
    return this.http.put<Postagem>('https://unidasheroku.herokuapp.com/postagens', postagem, this.token);
  }


  deletePost(id: number) {
    return this.http.delete(`https://unidasheroku.herokuapp.com/postagens/${id}`, this.token)
  }



}
