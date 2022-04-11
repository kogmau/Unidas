import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ContatoComponent } from './contato/contato.component';
import { PerfilDeleteComponent } from './delete/perfil-delete/perfil-delete.component';
import { PostagemDeleteComponent } from './delete/postagem-delete/postagem-delete.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { PerfilEditComponent } from './edit/perfil-edit/perfil-edit.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { EntrarComponent } from './entrar/entrar.component';
import { InicioComponent } from './inicio/inicio.component';

import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { TemaComponent } from './tema/tema.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [


  {path:'',redirectTo:'entrar', pathMatch:'full'},

  {path:'entrar',component:EntrarComponent},
  {path:'cadastrar',component:CadastrarComponent},
  {path:'inicio',component:InicioComponent},
  {path:'tema',component:TemaComponent},
  {path:'sobre-nos',component:SobreNosComponent},
  {path:'contato',component:ContatoComponent},
  {path:'usuarios',component:UsuariosComponent},


  // edit
{path:'tema-edit/:id',component:TemaEditComponent},
{path:'postagem-edit/:id',component:PostagemEditComponent},
{path:'perfil-edit/:id',component:PerfilEditComponent},


  // delete
  {path:'tema-delete/:id',component:TemaDeleteComponent},
{path:'postagem-delete/:id',component:PostagemDeleteComponent},
{path:'perfil-delete/:id',component:PerfilDeleteComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
