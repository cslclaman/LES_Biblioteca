import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { pessoa } from 'app/pessoa';
import { livro } from 'app/livro';
import { emprestimo } from 'app/emprestimo';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  socio: pessoa;
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
  Lreserva = new emprestimo();
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

  realizarReserva(event) {
    event.preventDefault();

    console.log(this.selectedLivro);
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
    this.Lreserva.socio = this.socio;
    this.Lreserva.livro = this.livro;
    this.Lreserva.ativo = true;
    this.Lreserva.dataReserva = new Date();

    let hdr = new Headers();
    hdr.append('Content-Type', 'application/json');

    this.http
      .post('http://localhost:3000/api/reservas', JSON.stringify(this.Lreserva), { headers: hdr })
      .subscribe(res => {
        let resultado = res.json();
        console.log(resultado);
      });
  }
}
