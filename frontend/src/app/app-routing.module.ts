import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'produtos',
        loadChildren: () => import('./components/produtos/list-produtos/list-produtos.component').then(m => m.ListProdutosModule)
    },
    {
        path: 'clientes',
        loadChildren: () => import('./components/cliente/list-clientes/list-clientes.component').then(m => m.ListClientesModule)
    },
    {
        path: 'cliente',
        loadChildren: () => import('./components/cliente/cliente.component').then(m => m.ClienteModule)
    },
    {
        path: 'pedidos',
        loadChildren: () => import('./components/pedido/list-pedidos/list-pedidos.component').then(m => m.ListPedidosModule)
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
