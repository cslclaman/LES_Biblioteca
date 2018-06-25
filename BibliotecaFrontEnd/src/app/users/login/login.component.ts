import { Component, OnInit } from '@angular/core';
import { user } from 'app/user';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  http: Http;
  router: Router;
  userlogin: user;
  message: string;

  constructor(http: Http, router: Router) {
    this.http = http;
    this.router = router;
  }

  ngOnInit() {
  }

  login(event) {
    event.preventDefault();
    this.message = "";

    this.userlogin = new user(this.username, this.password);
    let hdr = new Headers();
    hdr.append('Content-Type', 'application/json');

    this.http
    .post('http://localhost:3000/api/login', JSON.stringify(this.userlogin),{ headers: hdr})
    .subscribe(res => {
        let resultado = res.json();
        if (resultado.status == "OK"){
          //Armazena dados do usuário no armazenamento local do computador
          localStorage.setItem('usuario', JSON.stringify(resultado.usuario));          
          //Redireciona para o menu
          if(this.userlogin.login == 'admin' || this.userlogin.login == 'funcionario')
          {
            this.router.navigate(['/dshFuncionario'])
          }
          else
          {
            this.router.navigate(['/dshSocio'])
          }
          //this.router.navigate(['/menu']);
        }else{
          //Apresenta mensagem de erro na tela
          this.message = resultado.message;
          return;
        }
    });
  }
}
