import { Component, NgModule } from '@angular/core';
import { Produto } from 'src/models/produto-model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemProdutoCardComponent } from './item-produto-card/item-produto-card.component';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent {

  produtos: Produto[] = [
    new Produto(1,'Produto 1', 'Descrição do Produto 1', 10.00),
    new Produto(1, 'Produto 2', 'Descrição do Produto 2', 20.00),
    new Produto(1, 'Produto 3', 'Descrição do Produto 3', 30.00),
    new Produto(1, 'Produto 4', 'Descrição do Produto 4', 40.00)];
}
@NgModule({
  declarations: [ProdutosComponent, ItemProdutoCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {path: '', component: ProdutosComponent}
    ])

],
  exports: [ProdutosComponent]
})
export class ProdutosModule {};
