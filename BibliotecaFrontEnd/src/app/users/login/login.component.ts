import { Component, OnInit } from '@angular/core';
import { user } from 'app/user';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  http: Http;
  userlogin: user;

  constructor(http: Http) {

    this.http = http;
  }

  ngOnInit() {
  }

  login(event) {
    event.preventDefault();

    this.userlogin = new user(this.username, this.password);
    let hdr = new Headers();
    hdr.append('Content-Type', 'application/json');

    this.http
    .post('http://localhost:3000/api/login', JSON.stringify(this.userlogin),{ headers: hdr})
    .subscribe(res => {
        let resultado = res.json();
        console.log(resultado);
    });
    console.log(this.username);
    console.log(this.password);
  }
}
