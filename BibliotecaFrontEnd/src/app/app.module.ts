import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './users/login/login.component';
import { RegFuncionarioComponent } from './users/cadastro/funcionario/reg-funcionario/reg-funcionario.component';
import { RegLivroComponent } from './users/cadastro/livro/reg-livro/reg-livro.component';
import { RegSocioComponent } from './users/cadastro/socio/reg-socio/reg-socio.component';
import { MenuComponent } from './users/menu/menu.component';
import { routing } from './app.routes';
import { AutorComponent } from './users/cadastro/autor/autor.component';
import { ReservaComponent } from './users/processos/reserva/reserva.component';
import { EmprestimoComponent } from './users/processos/emprestimo/emprestimo.component';
import { MnulivroComponent } from './users/consultas/mnulivro/mnulivro.component';
import { MnuAutorComponent } from './users/consultas/mnu-autor/mnu-autor.component';
import { MnuFuncionarioComponent } from './users/consultas/mnu-funcionario/mnu-funcionario.component';
import { MnuEmprestimoComponent } from './users/consultas/mnu-emprestimo/mnu-emprestimo.component';
import { MnuReservaComponent } from './users/consultas/mnu-reserva/mnu-reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegFuncionarioComponent,
    RegLivroComponent,
    RegSocioComponent,
    MenuComponent,
    AutorComponent,
    ReservaComponent,
    EmprestimoComponent,
    MnulivroComponent,
    MnuAutorComponent,
    MnuFuncionarioComponent,
    MnuEmprestimoComponent,
    MnuReservaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
