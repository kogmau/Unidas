import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  Entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>('https://unidasheroku.herokuapp.com/usuarios/logar', usuarioLogin);
  }



  Cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('https://unidasheroku.herokuapp.com/usuarios/cadastrar', usuario);
  }


putUser(usuario:Usuario):Observable<Usuario>{
  return this.http.put<Usuario>('https://unidasheroku.herokuapp.com/usuarios/atualizar',usuario);
}

  getAllUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('https://unidasheroku.herokuapp.com/usuarios/all');
  }


  getByIdUser(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`https://unidasheroku.herokuapp.com/usuarios/${id}`);
  }


  deleteUser(id: number) {
    return this.http.delete<Usuario>(`https://unidasheroku.herokuapp.com/usuarios/${id}`);
  }






  logado() {
    let ok: boolean = false;


    if (environment.token != '') {
      ok = true;
    }

    return ok;
  }



  adm() {
    let ok: boolean = false;


    if (environment.tipo == 'adm') {
      ok = true;
    }

    return ok;
  }
}


