import { Component, NgModule } from '@angular/core';
import { Produto } from 'src/models/produto-model';
import { ItemProdutoModule } from './item-produto/item-produto.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent {

  produtos: Produto[];
}
@NgModule({
  declarations: [ProdutosComponent],
  imports: [CommonModule, ItemProdutoModule],
  exports: [ProdutosComponent]
})
export class ProdutosModule {};
