import { Component, OnInit } from '@angular/core';
import { autor } from '../../../autor';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {

  nome: string;
  sobrenome: string;
  http: Http;
  
  constructor(http: Http) { 
    this.http = http;
  }

  ngOnInit() {
  }

  LAutor = new autor();

  cadastrarAutor(event) {

    event.preventDefault();
    
    this.LAutor.nome = this.nome;
    this.LAutor.sobrenome = this.sobrenome;

    let hdr = new Headers();
    hdr.append('Content-Type', 'application/json');

    this.http
    .post('http://localhost:3000/api/autores', JSON.stringify(this.LAutor),{ headers: hdr})
    .subscribe(res => {
        let resultado = res.json();
        console.log(resultado);
    });

    console.log(this.LAutor);
  }
}
