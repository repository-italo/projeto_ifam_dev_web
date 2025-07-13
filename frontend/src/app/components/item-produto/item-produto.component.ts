import { Component, Input, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import {ButtonModule} from 'primeng/button';

import { Produto } from 'src/models/produto-model';

@Component({
  selector: 'app-item-produto',
  templateUrl: './item-produto.component.html',
  styleUrls: ['./item-produto.component.scss']
})
export class ItemProdutoComponent implements OnInit {

    id!: number;

    constructor(private route: ActivatedRoute){}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
    }

    @Input() produto!: Produto;

}

@NgModule({
    declarations: [ItemProdutoComponent],
    imports: [
        ButtonModule,
        RouterModule.forChild([
            {path: '', component: ItemProdutoComponent}
        ])
    ],
    exports: [ItemProdutoComponent]
})
export class ItemProdutoModule { }

