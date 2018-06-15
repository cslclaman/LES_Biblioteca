import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { MenuComponent } from './users/menu/menu.component';
import { RegFuncionarioComponent } from './users/cadastro/funcionario/reg-funcionario/reg-funcionario.component';
import { RegLivroComponent } from './users/cadastro/livro/reg-livro/reg-livro.component';
import { RegSocioComponent } from './users/cadastro/socio/reg-socio/reg-socio.component';

const appRoutes: Routes = [

    { path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent},
    { path: 'menu', component: MenuComponent},
    { path: 'regfunc', component: RegFuncionarioComponent},
    { path: 'reglivro', component: RegLivroComponent},
    { path: 'regsocio', component: RegSocioComponent}
    
];

export const routing = RouterModule.forRoot(appRoutes);
