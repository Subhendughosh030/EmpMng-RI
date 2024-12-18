import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./components/emp-viewer/emp-viewer.component').then(m => m.EmpViewerComponent)
    },
    {
        path: 'add',
        loadComponent: () =>
            import('./components/emp-form/emp-form.component').then(m => m.EmpFormComponent)
    },
    {
        path: 'edit',
        loadComponent: () =>
            import('./components/emp-form/emp-form.component').then(m => m.EmpFormComponent)
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }