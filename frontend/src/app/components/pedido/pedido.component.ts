import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared-module';
import { Pedido } from 'src/models/pedido-model';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class ListPedidoComponent {
    pedidos!: Pedido;


};

@NgModule({
    declarations: [ListPedidoComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {path: '', component: ListPedidoComponent}
        ])
    ],
    exports: [ListPedidoComponent]
})
export class ListPedidoModule {};
