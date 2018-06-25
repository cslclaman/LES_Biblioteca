import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { pessoa } from 'app/pessoa';

@Component({
  selector: 'app-mnu-funcionario',
  templateUrl: './mnu-funcionario.component.html',
  styleUrls: ['./mnu-funcionario.component.css']
})
export class MnuFuncionarioComponent implements OnInit {

  funcionarios: pessoa[];
  http: Http;

  constructor(http: Http) {
    this.http = http;

    let streamautor = this.http.get('http://localhost:3000/api/funcionarios');
    streamautor.subscribe(res => {
      this.funcionarios = (res.json());
      console.log(this.funcionarios);
    });
  }

  ngOnInit() {
  }

  deleteFuncionario(Id: number) {

    let StreamDel = this.http.delete('http://localhost:3000/api/funcionario/' + Id);
    StreamDel.subscribe(res => {
      console.log(res.json());
    })

  }
}
