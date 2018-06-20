import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { MenuComponent } from './users/menu/menu.component';
import { RegFuncionarioComponent } from './users/cadastro/funcionario/reg-funcionario/reg-funcionario.component';
import { RegLivroComponent } from './users/cadastro/livro/reg-livro/reg-livro.component';
import { RegSocioComponent } from './users/cadastro/socio/reg-socio/reg-socio.component';
import { AutorComponent } from './users/cadastro/autor/autor.component';
import { EmprestimoComponent } from './users/processos/emprestimo/emprestimo.component';
import { ReservaComponent } from './users/processos/reserva/reserva.component';
import { MnuAutorComponent } from 'app/users/consultas/mnu-autor/mnu-autor.component';
import { MnuEmprestimoComponent } from 'app/users/consultas/mnu-emprestimo/mnu-emprestimo.component';
import { MnuFuncionarioComponent } from 'app/users/consultas/mnu-funcionario/mnu-funcionario.component';
import { MnuReservaComponent } from 'app/users/consultas/mnu-reserva/mnu-reserva.component';
import { MnulivroComponent } from 'app/users/consultas/mnulivro/mnulivro.component';

const appRoutes: Routes = [

    { path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent},
    { path: 'menu', component: MenuComponent},
    { path: 'regfunc', component: RegFuncionarioComponent},
    { path: 'reglivro', component: RegLivroComponent},
    { path: 'regsocio', component: RegSocioComponent},
    { path: 'regautor', component: AutorComponent},
    { path: 'actEmprestimo', component: EmprestimoComponent},
    { path: 'actReserva', component: ReservaComponent},
    { path: 'mnuAutor', component: MnuAutorComponent},
    { path: 'mnuEmprestimo', component: MnuEmprestimoComponent},
    { path: 'mnuFuncionario', component: MnuFuncionarioComponent},
    { path: 'mnuLivro', component: MnulivroComponent},
    { path: 'mnuReserva', component: MnuReservaComponent},
    

    
];

export const routing = RouterModule.forRoot(appRoutes);
