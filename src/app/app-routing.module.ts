import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./components/emp-list/emp-list.component').then(m => m.EmpListComponent)
    },
    {
        path: 'add',
        loadComponent: () =>
            import('./components/emp-form/emp-form.component').then(m => m.EmpFormComponent)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }