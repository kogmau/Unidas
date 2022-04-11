import { HttpClientModule } from '@angular/common/http'

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';


import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { AppComponent } from './app.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { InicioComponent } from './inicio/inicio.component';
import { ContatoComponent } from './contato/contato.component';
import { EntrarComponent } from './entrar/entrar.component';
import { AlertasComponent } from './alertas/alertas.component';
import { PerfilEditComponent } from './edit/perfil-edit/perfil-edit.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { PerfilDeleteComponent } from './delete/perfil-delete/perfil-delete.component';
import { PostagemDeleteComponent } from './delete/postagem-delete/postagem-delete.component';
import { TemaComponent } from './tema/tema.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


@NgModule({
  declarations: [
    AppComponent,
    CadastrarComponent,
    RodapeComponent,
    MenuComponent,
    SobreNosComponent,
    InicioComponent,
    ContatoComponent,
    EntrarComponent,
    AlertasComponent,
    PerfilEditComponent,
    PostagemEditComponent,
    TemaEditComponent,
    TemaDeleteComponent,
    PerfilDeleteComponent,
    PostagemDeleteComponent,
    TemaComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    ModalModule.forRoot(), 
    OrderModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
