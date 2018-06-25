import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { pessoa } from 'app/pessoa';
import { emprestimo } from 'app/emprestimo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-socio',
  templateUrl: './dash-socio.component.html',
  styleUrls: ['./dash-socio.component.css']
})
export class DashSocioComponent implements OnInit {
  http: Http;
  router: Router;
  emprestimos: any[];
  reservas: any[];
  usuarios: pessoa[];
  current: pessoa;

  constructor(http: Http, router: Router) {
    this.http = http;
    this.router = router;
    /*
        let streamautor = this.http.get('http://localhost:3000/api/reservas');
        streamautor.subscribe(res => {
          this.reservas = (res.json());
          console.log(this.reservas);
        });
    
        let streamemps = this.http.get('http://localhost:3000/api/emprestimos');
        streamemps.subscribe(res => {
          this.emprestimos = (res.json());
          console.log(this.emprestimos);
        });*/

    let usuario = JSON.parse(localStorage.getItem('usuario'));

    let streamusr = this.http.get('http://localhost:3000/api/socios');
    streamusr.subscribe(res => {
      this.usuarios = (res.json());
      console.log(this.usuarios);

      for (let i = 0; i < this.usuarios.length; i++) {
        if (this.usuarios[i].login == usuario.login) {
          this.current = this.usuarios[i];
        }
      }
      console.log(this.current);
      let streamemp = this.http.get('http://localhost:3000/api/emprestimo' + this.current._idPessoa);
      streamemp.subscribe(res => {
        this.emprestimos = (res.json());
        console.log(this.emprestimos);
      });

      let streamres = this.http.get('http://localhost:3000/api/reserva' + this.current._idPessoa);
      streamres.subscribe(res => {
        this.reservas = (res.json());
        console.log(this.reservas);
      });
    });

  }

  ngOnInit() {
  }

  deleteReserva(Id: number) {

    let StreamDel = this.http.delete('http://localhost:3000/api/reserva/' + Id);
    StreamDel.subscribe(res => {
      console.log(res.json());
    })
  }

  logout() {
    //Quando aperta pra fazer logout, apaga o usuário que estava salvo e redireciona para a tela de login
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
