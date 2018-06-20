import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
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

    let streamautor = this.http.get('http://localhost:3000/api/emprestimos');
    streamautor.subscribe(res => {
      this.emprestimos = (res.json());
      console.log(this.emprestimos);
    });
  }

  ngOnInit() {
  }

}
