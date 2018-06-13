import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './users/login/login.component';
import { RegFuncionarioComponent } from './users/cadastro/funcionario/reg-funcionario/reg-funcionario.component';
import { RegLivroComponent } from './users/cadastro/livro/reg-livro/reg-livro.component';
import { RegSocioComponent } from './users/cadastro/socio/reg-socio/reg-socio.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegFuncionarioComponent,
    RegLivroComponent,
    RegSocioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
