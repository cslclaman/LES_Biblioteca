import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { autor } from 'app/autor';

@Component({
  selector: 'app-mnu-autor',
  templateUrl: './mnu-autor.component.html',
  styleUrls: ['./mnu-autor.component.css']
})
export class MnuAutorComponent implements OnInit {

  autores: autor[];
  http: Http;
  rowData: any;

  columnDefs = [
    {headerName: 'ID', field: '_idAutor'},
    {headerName: 'Nome', field: 'nome'},
    {headerName: 'SobreNome', field: 'sobrenome'}
  ];

  constructor(http: Http) { 
    this.http = http;

    let streamautor = this.http.get('http://localhost:3000/api/autores');
    streamautor.subscribe(res => {
      this.autores = (res.json());
      console.log(this.autores);
    });
  }

  ngOnInit() {
  }

  deleteAutor(idAutor: number){

    let StreamDel = this.http.delete('http://localhost:3000/api/autor/'+ idAutor);
    StreamDel.subscribe(res => {
      console.log(res.json());
  });
}

}
