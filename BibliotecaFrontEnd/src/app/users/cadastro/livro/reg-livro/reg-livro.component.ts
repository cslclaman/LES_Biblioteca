import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { autor } from 'app/autor';
import { livro } from 'app/livro';

@Component({
  selector: 'app-reg-livro',
  templateUrl: './reg-livro.component.html',
  styleUrls: ['./reg-livro.component.css']
})

export class RegLivroComponent implements OnInit {
  titulo: string;
  autor: autor;
  idautor: number;
  editora: string;
  edicao: number;
  genero: string;
  numPaginas: number;
  ano: number;
  autores: autor[];
  selected: any;
  http: Http;
  constructor(http: Http) { 
    this.http = http;

    let stream = this.http.get('http://localhost:3000/api/autores');
    stream.subscribe(res => {
      this.autores = (res.json());
      //console.log(res.json());
      console.log(this.autores);
    });
  }

  ngOnInit() {
    
  }
  LLivro = new livro();
  cadastrarLivro(event) {
    event.preventDefault();
    console.log(this.selected);

    for(var i = 0; i < this.autores.length; i++)
    {
      if(this.autores[0]._idAutor == this.selected)
      {
        this.autor = this.autores[0];
      }
    }

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
        if(res.ok)
        {
          alert("Livro Cadastrado!");
          this.titulo = null;
          this.edicao = null;
          this.editora = null;
          this.genero = null;
          this.ano = null;
          this.numPaginas = null;
        }
    });
  }

}