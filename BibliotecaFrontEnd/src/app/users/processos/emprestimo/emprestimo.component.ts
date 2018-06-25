import { Component, OnInit } from '@angular/core';
import { pessoa } from 'app/pessoa';
import { livro } from 'app/livro';
import { Http, Headers } from '@angular/http';
import { emprestimo } from 'app/emprestimo';
import { autor } from 'app/autor';
import { socio } from 'app/socio';

@Component({
  selector: 'app-emprestimo',
  templateUrl: './emprestimo.component.html',
  styleUrls: ['./emprestimo.component.css']
})
export class EmprestimoComponent implements OnInit {

  socio: pessoa;
  empSocio: pessoa;
  empLivro: livro;
  selected: any;
  selectedSocio: any;
  livro: livro;
  selectedLivro: any;
  status: string;
  ativo: boolean;
  dataReserva: Date;
  dataEmprestimo: Date;
  dataRetorno: Date;
  dataDevolucao: Date;
  http: Http;

  socios: pessoa[];
  livros: livro[];

  Lemprestimo = new emprestimo();

  constructor(http: Http) {
    this.http = http;

    let streamsocio = this.http.get('http://localhost:3000/api/socios');
    streamsocio.subscribe(res => {
      this.socios = (res.json());
      console.log(this.socios);
    });

    let streamlivro = this.http.get('http://localhost:3000/api/livros');
    streamlivro.subscribe(res => {
      this.livros = (res.json());
      console.log(this.livros);
    });
  }

  ngOnInit() {
  }

  realizarEmprestimo(event) {
    event.preventDefault();
    
    for (var i = 0; i < this.socios.length; i++) {
      if (this.socios[i]._idPessoa == this.selectedSocio) {
        this.socio = this.socios[i];
      }
    }
    for (var i = 0; i < this.livros.length; i++) {
      if (this.livros[i]._idLivro == this.selectedLivro) {
        this.livro = this.livros[i];
      }
    }
    console.log("selecteds");
    //console.log(this.selected);
    console.log(this.selectedSocio);
    console.log(this.selectedLivro);
    /*
    let stEmpSoc = this.http.get('http://localhost:3000/api/socio' + this.selectedSocio._idPessoa);
    stEmpSoc.subscribe(res => {
      this.empSocio = (res.json());
    });

    let stEmpLiv = this.http.get('http://localhost:3000/api/livro' + this.selectedLivro._idLivro);
    stEmpLiv.subscribe(res => {
      this.empLivro = (res.json());
    });*/

    this.Lemprestimo.socio = this.socio;
    this.Lemprestimo.livro = this.livro;
    //this.Lemprestimo.ativo = true;
    //this.Lemprestimo.dataEmprestimo = new Date();
    //var datedev = this.Lemprestimo.dataDevolucao = new Date();
    /*if (this.socio.tipoSocio == "aluno" || this.socio.cargo != null) {
      this.Lemprestimo.dataDevolucao.setDate(datedev.getDate() + 7);
    }
    else {
      this.Lemprestimo.dataDevolucao.setDate(datedev.getDate() + 14);
    }*/

    let hdr = new Headers();
    hdr.append('Content-Type', 'application/json');

    this.http
      .post('http://localhost:3000/api/emprestimos', JSON.stringify(this.Lemprestimo), { headers: hdr })
      .subscribe(res => {
        let resultado = res.json();
        console.log(resultado);
      });

  }

}
