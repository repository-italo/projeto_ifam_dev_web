import { Component, Input, NgModule } from '@angular/core';
import { Produto } from 'src/models/produto-model';

@Component({
  selector: 'app-item-produto',
  templateUrl: './item-produto.component.html',
  styleUrls: ['./item-produto.component.scss']
})
export class ItemProdutoComponent {

    @Input() produto!: Produto;

}

@NgModule({
    declarations: [ItemProdutoComponent],
    imports: [],
    exports: [ItemProdutoComponent]
})
export class ItemProdutoModule { }

