import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  router: Router;
  nomeUsuario: string;
  permCadFunc: boolean = false;
  permCadSocio: boolean = false;
  permCadLivro: boolean = false;
  permCadAutor: boolean = false;
  permReserva: boolean = false;
  permEmprestimo: boolean = false;
  
  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit() {

    //Sabe aquele usuário que fez login? Agora é a hora de pegar ele de volta.
    let usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario == null){
      //Se não tinha usuário salvo, volta pra tela de login
      this.router.navigate(['/login']);
    } else {
      //Define as permissões (o que o usuário pode apertar)
      let permissoes : String;
      permissoes = usuario.permissoes;
      this.nomeUsuario = usuario.nome;

      this.permCadFunc = permissoes.includes("F");
      this.permCadSocio = permissoes.includes("S");
      this.permCadLivro = this.permCadAutor = permissoes.includes("A");
      this.permReserva = permissoes.includes("R");
      this.permEmprestimo = permissoes.includes("E");
    }

  }

  logout(){
    //Quando aperta pra fazer logout, apaga o usuário que estava salvo e redireciona para a tela de login
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

}
