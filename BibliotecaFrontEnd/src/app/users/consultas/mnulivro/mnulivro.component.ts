import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { livro } from 'app/livro';

@Component({
  selector: 'app-mnulivro',
  templateUrl: './mnulivro.component.html',
  styleUrls: ['./mnulivro.component.css']
})
export class MnulivroComponent implements OnInit {

  http: Http;
  livros: livro[];
  
  constructor(http: Http) { 
    this.http = http;

    let streamautor = this.http.get('http://localhost:3000/api/livros');
    streamautor.subscribe(res => {
      this.livros = (res.json());
      console.log(this.livros);
    });
  }

  ngOnInit() {
  }

}
