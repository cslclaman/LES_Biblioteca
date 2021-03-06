import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { pessoa } from 'app/pessoa';
import { emprestimo } from 'app/emprestimo';
import { Router } from '@angular/router';
import { livro } from 'app/livro';

@Component({
  selector: 'app-dash-socio',
  templateUrl: './dash-socio.component.html',
  styleUrls: ['./dash-socio.component.css']
})
export class DashSocioComponent implements OnInit {
  http: Http;
  router: Router;
  emprestimos: emprestimo[];
  reservas: emprestimo[];
  usuarios: pessoa[];
  current: pessoa;
  selectedLivro: any;
  Lreserva = new emprestimo();
  socio: pessoa;
  livro: livro;
  livros: livro[];

  constructor(http: Http, router: Router) {
    this.http = http;
    this.router = router;

    let usuario = JSON.parse(localStorage.getItem('usuario'));

    let streamusr = this.http.get('http://localhost:3000/api/socios');
    streamusr.subscribe(res => {
      this.usuarios = (res.json());
      console.log(this.usuarios);

      while(this.usuarios == null)
      {

      }
      for (let i = 0; i < this.usuarios.length; i++) {
        if (this.usuarios[i].login == usuario.login) {
          this.current = this.usuarios[i];
        }
      }
      
      let streamliv = this.http.get('http://localhost:3000/api/livros');
      streamliv.subscribe(res => {
        this.livros = (res.json());
        console.log(this.livros);
      });

      console.log(this.current);
      let streamemp = this.http.get('http://localhost:3000/api/emprestimos');
      streamemp.subscribe(res => {
        this.emprestimos = (res.json());
        //console.log(this.emprestimos);
      });

      for(let i = 0; i< this.emprestimos.length; i++)
      {
        if(this.emprestimos[i].socio != this.current)
        {
          this.emprestimos.splice(i);
        }
        else
        {
          var emp = this.emprestimos[i];
        }
      }
      
      let streamres = this.http.get('http://localhost:3000/api/reservas');
      streamres.subscribe(res => {
        this.reservas = (res.json());
        
        if(this.reservas == null)
        {
          console.log("sem reservas");
        }
      
        for(let i = 0; i< this.reservas.length; i++)
      {
        if(this.reservas[i].socio != this.current)
        {
          this.reservas.splice(i);
        }
        else
        {
          var emp = this.reservas[i];
        }
      }
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

  realizarReserva(event) {
    //event.preventDefault();
    for (var i = 0; i < this.livros.length; i++) {
      if (this.livros[i]._idLivro == this.selectedLivro) {
        this.livro = this.livros[i];
      }
    }
    this.Lreserva.socio = this.current;
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

  logout() {
    //Quando aperta pra fazer logout, apaga o usuário que estava salvo e redireciona para a tela de login
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
