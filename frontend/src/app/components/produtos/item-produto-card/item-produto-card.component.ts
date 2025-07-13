import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-produto-card',
  templateUrl: './item-produto-card.component.html',
  styleUrls: ['./item-produto-card.component.scss']
})
export class ItemProdutoCardComponent implements OnInit {

    @Input() produto: any; // Replace 'any' with the actual type of produto if available

    constructor() { }

    ngOnInit(): void {
    }

}
