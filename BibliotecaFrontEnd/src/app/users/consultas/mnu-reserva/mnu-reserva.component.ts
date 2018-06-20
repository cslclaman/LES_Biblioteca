import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { reserva } from 'app/reserva';
import { emprestimo } from 'app/emprestimo';

@Component({
  selector: 'app-mnu-reserva',
  templateUrl: './mnu-reserva.component.html',
  styleUrls: ['./mnu-reserva.component.css']
})
export class MnuReservaComponent implements OnInit {

  http: Http;
  reservas: emprestimo[];
  
  constructor(http: Http) {
    this.http = http;

    let streamautor = this.http.get('http://localhost:3000/api/reservas');
    streamautor.subscribe(res => {
      this.reservas = (res.json());
      console.log(this.reservas);
    });
   }

  ngOnInit() {
  }

}
