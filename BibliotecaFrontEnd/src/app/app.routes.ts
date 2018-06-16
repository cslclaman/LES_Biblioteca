import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { MenuComponent } from './users/menu/menu.component';
import { RegFuncionarioComponent } from './users/cadastro/funcionario/reg-funcionario/reg-funcionario.component';
import { RegLivroComponent } from './users/cadastro/livro/reg-livro/reg-livro.component';
import { RegSocioComponent } from './users/cadastro/socio/reg-socio/reg-socio.component';
import { AutorComponent } from './users/cadastro/autor/autor.component';
import { EmprestimoComponent } from './users/processos/emprestimo/emprestimo.component';
import { ReservaComponent } from './users/processos/reserva/reserva.component';

const appRoutes: Routes = [

    { path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent},
    { path: 'menu', component: MenuComponent},
    { path: 'regfunc', component: RegFuncionarioComponent},
    { path: 'reglivro', component: RegLivroComponent},
    { path: 'regsocio', component: RegSocioComponent},
    { path: 'regautor', component: AutorComponent},
    { path: 'actEmprestimo', component: EmprestimoComponent},
    { path: 'actReserva', component: ReservaComponent}
    
];

export const routing = RouterModule.forRoot(appRoutes);
