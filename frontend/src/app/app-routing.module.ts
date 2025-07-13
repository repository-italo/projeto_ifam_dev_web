import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'produtos',
        loadChildren: () => import('./components/produtos/produtos.component').then(m => m.ProdutosModule)
    },
    {
        path: 'cliente',
        loadChildren: () => import('./components/cliente/cliente.component').then(m => m.ClienteModule)
    },
    {
        path: 'pedido',
        loadChildren: () => import('./components/pedido/pedido.component').then(m => m.PedidoModule)
    },
    {
        path: 'produto/:id',
        loadChildren: () => import('./components/item-produto/item-produto.component').then(m => m.ItemProdutoModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
