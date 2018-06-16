import { Component, OnInit } from '@angular/core';
import { pessoa } from 'app/pessoa';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-reg-funcionario',
  templateUrl: './reg-funcionario.component.html',
  styleUrls: ['./reg-funcionario.component.css']
})
export class RegFuncionarioComponent implements OnInit {

  nome: string;
  dataNascimento: Date;
  cpf: string;
  endereco: string;
  telefone: string;
  email: string;
  login: string;
  senha: string;
  cargo: string;
  http: Http;

  constructor(http: Http) { 
    this.http = http;
  }

  ngOnInit() {
  }

  LPessoa = new pessoa();
  
  cadastrarFuncionario(event)
  {
    event.preventDefault();
    
    this.LPessoa.nome = this.nome;
    this.LPessoa.dataNascimento = this.dataNascimento;
    this.LPessoa.cpf = this.cpf;
    this.LPessoa.endereco = this.endereco;
    this.LPessoa.telefone = this.telefone;
    this.LPessoa.email = this.email;
    this.LPessoa.login = this.login;
    this.LPessoa.senha = this.senha;
    this.LPessoa.cargo = this.cargo;

    let hdr = new Headers();
    hdr.append('Content-Type', 'application/json');

    this.http
    .post('http://localhost:3000/api/funcionarios', JSON.stringify(this.LPessoa),{ headers: hdr})
    .subscribe(res => {
        let resultado = res.json();
        console.log(resultado);
    });

    console.log(this.LPessoa);
  }

}
