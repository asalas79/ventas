import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  /*{
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },*/
  {
    path: 'main',
    loadChildren: () => import('./pages/couriers/couriers.module').then( m => m.CouriersPageModule),
    canLoad:[ UsuarioGuard ]
  },
  {
    path:'listado',
    loadChildren: () => import('./pages/listado/listado.module').then( m => m.ListadoPageModule),
    canLoad:[ UsuarioGuard ]
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'pruebas',
    loadChildren: () => import('./pages/pruebas/pruebas.module').then( m => m.PruebasPageModule),
    canLoad:[ UsuarioGuard ]
  },    
  {
    path: 'verifica',
    loadChildren: () => import('./pages/verifica/verifica.module').then( m => m.VerificaPageModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'main'
  }
  
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
