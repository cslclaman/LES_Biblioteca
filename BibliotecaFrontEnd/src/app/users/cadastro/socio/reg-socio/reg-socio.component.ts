import { Component, OnInit } from '@angular/core';
import { pessoa } from '../../../../pessoa';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-reg-socio',
  templateUrl: './reg-socio.component.html',
  styleUrls: ['./reg-socio.component.css']
})
export class RegSocioComponent implements OnInit {

  nome: string;
  dataNascimento: Date;
  cpf: string;
  endereco: string;
  telefone: string;
  email: string;
  login: string;
  senha: string;
  tipoSocio: string;
  cargo: string;
  http: Http;
  
  constructor(http: Http) { 
    this.http = http;
  }

  ngOnInit() {
    let stream = this.http.get('http://localhost:3000/api/socios');
    stream.subscribe(res => {
      var teste = res.json();
      console.log(res.json());
    });
  }

  LPessoa = new pessoa();

  cadastrarSocio(event) {
    event.preventDefault();
    this.LPessoa.nome = this.nome;
    this.LPessoa.dataNascimento = this.dataNascimento;
    this.LPessoa.cpf = this.cpf;
    this.LPessoa.endereco = this.endereco;
    this.LPessoa.telefone = this.telefone;
    this.LPessoa.email = this.email;
    this.LPessoa.login = this.login;
    this.LPessoa.senha = this.senha;
    this.LPessoa.tipoSocio = this.tipoSocio;

    let hdr = new Headers();
    hdr.append('Content-Type', 'application/json');

    this.http
    .post('http://localhost:3000/api/socios', JSON.stringify(this.LPessoa),{ headers: hdr})
    .subscribe(res => {
        let resultado = res.json();
        console.log(resultado);
    });

    console.log(this.LPessoa);
  }
}
