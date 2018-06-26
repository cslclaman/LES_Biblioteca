import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { emprestimo } from 'app/emprestimo';

@Component({
  selector: 'app-mnu-emprestimo',
  templateUrl: './mnu-emprestimo.component.html',
  styleUrls: ['./mnu-emprestimo.component.css']
})
export class MnuEmprestimoComponent implements OnInit {

  emprestimos: emprestimo[];
  http: Http;

  constructor(http: Http) { 
    this.http = http;
    let hdr = new Headers();
    hdr.append('Content-Type', 'application/json');

    let streamautor = this.http.get('http://localhost:3000/api/emprestimos');
    streamautor.subscribe(res => {
      this.emprestimos = (res.json());
      console.log(this.emprestimos);
    });
  }

  ngOnInit() {
  }

  renovar(Id: number)
  {
    let hdr = new Headers();
    hdr.append('Content-Type', 'application/json');

    this.http
      .post('http://localhost:3000/api/renovacao/' + Id, { headers: hdr })
      .subscribe(res => {
        let resultado = res.json();
        console.log(resultado);
      });
  }

  devolver(Id: number)
  {
    let hdr = new Headers();
    hdr.append('Content-Type', 'application/json');
    this.http
    .post('http://localhost:3000/api/devolucao' + Id, { headers: hdr })
    .subscribe(res => {
      let resultado = res.json();
      console.log(resultado);
    });
  }
}
