import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { autor } from 'app/autor';

@Component({
  selector: 'app-reg-livro',
  templateUrl: './reg-livro.component.html',
  styleUrls: ['./reg-livro.component.css']
})

export class RegLivroComponent implements OnInit {
  titulo: string;
  autor: number;
  editora: string;
  edicao: number;
  genero: string;
  numPaginas: number;
  ano: number;
  autores = [];
  http: Http;

  constructor(http: Http) { 
    this.http = http;
    let stream = http.get('http://localhost:3000/api/autores');
    stream.subscribe(res => {
      this.autores = res.json();
    });
  }

  ngOnInit() {

  }
  LLivro = new Clivro();

  cadastrarLivro(event) {
    event.preventDefault();
    
    this.LLivro.titulo = this.titulo;
    this.LLivro.autor = this.autor;
    this.LLivro.editora = this.editora;
    this.LLivro.edicao = this.edicao;
    this.LLivro.genero = this.genero;
    this.LLivro.numPaginas = this.numPaginas;
    this.LLivro.ano = this.ano;
    
    let hdr = new Headers();
    hdr.append('Content-Type', 'application/json');

    this.http
    .post('http://localhost:3000/api/livros', JSON.stringify(this.LLivro),{ headers: hdr})
    .subscribe(res => {
        let resultado = res.json();
        console.log(resultado);
    });
    console.log(this.LLivro);
  }
}

export class Clivro {
  @Input() titulo: string;
  @Input() autor: number;
  @Input() editora: string;
  @Input() edicao: number;
  @Input() genero: string;
  @Input() numPaginas: number;
  @Input() ano: number;
}
