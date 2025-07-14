import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared-module';
import { ItemPedido } from 'src/models/item-pedido-model';
import { Pedido } from 'src/models/pedido-model';
import { ItemPedidoService } from 'src/services/item-pedido.service';
import { PedidoService } from 'src/services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './list-pedidos.component.html',
  styleUrls: ['./list-pedidos.component.scss']
})
export class ListPedidosComponent implements OnInit {
    pedidos: Pedido[] = [];
    clientId!: number | null;
    httpError: string | null = null;
    totalPedidos: Map<number, number> = new Map();
    itens: ItemPedido[] = [];
    isFetching: boolean = false;

    subscriptions: Subscription = new Subscription();

    constructor(
        private pedidoService: PedidoService,
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private itemPedidoService: ItemPedidoService
    ) { }

    ngOnInit() {
        this.isFetching = true;
        this.subscriptions.add(
            this.itemPedidoService.get().subscribe({
                next: (itens) => {
                    this.itens = itens;
                    console.log('Itens de pedido carregados:', itens);
                },
                error: (error) => {
                    console.error('Erro ao carregar itens de pedido:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: 'Erro ao carregar itens de pedido.'
                    });
                }
            })
        );

        this.subscriptions.add(
            this.pedidoService.get().subscribe({
                next: (pedidos) => {
                    this.isFetching = false;
                    this.pedidos = this.clientId ? pedidos.filter(pedido => pedido.cliente === this.clientId) : pedidos;
                    this.pedidos.forEach(pedido => {
                        const total = this.itens
                                            .filter(item => item.pedido === pedido.id)
                                            .reduce((acc, item) => acc + (item.preco_unitario * item.quantidade), 0);
                        this.totalPedidos.set(pedido.id, total);
                    });

                    this.httpError = null;
                },
                error: (error) => {
                    console.error('Erro ao carregar pedidos:', error);
                    this.httpError = 'Erro ao carregar pedidos. Tente novamente mais tarde.';
                }
            })
        );

        this.subscriptions.add(
            this.route.paramMap.subscribe(params => {
                const clientId = params.get('clientId');
                this.clientId = clientId ? +clientId : null;
                if (clientId) {
                    this.pedidos = this.pedidos.filter(pedido => pedido.cliente === +clientId);
                }
            })
        )

    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    redirectToManage (pedido?: Pedido) {
        if (pedido) {
            this.router.navigate(['/pedidos/manage', pedido.id]);
        } else {
            this.router.navigate(['/pedidos/manage/create']);
        }
    }

    confirmDeletion (pedido: Pedido) {
        console.log('Confirmando exclusão do pedido:', pedido);
        this.confirmationService.confirm({
            header: 'Confirmação',
            message: `Você tem certeza que deseja excluir o pedido ${pedido.id}?`,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.subscriptions.add(
                    this.pedidoService.delete(pedido.id).subscribe({
                        next: () => {
                            this.pedidos = this.pedidos.filter(p => p.id !== pedido.id);
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sucesso',
                                detail: 'Pedido excluído com sucesso!'
                            });
                        },
                        error: (error) => {
                            console.error('Erro ao excluir pedido:', error);
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Erro',
                                detail: 'Erro ao excluir pedido.'
                            });
                        }
                    })
                );
            }
        })
    }

    totalPedido(id: number): number {
        return this.totalPedidos.get(id) || 0;
    }
};

@NgModule({
    declarations: [ListPedidosComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: ListPedidosComponent
            },
            {
                path: ':clientId',
                component: ListPedidosComponent
            },
            {
                path: 'manage/:id',
                loadChildren: () => import('../manage-pedido/manage-pedido.component').then(m => m.ManagePedidoModule)
            },
            {
                path: 'manage/create',
                loadChildren: () => import('../manage-pedido/manage-pedido.component').then(m => m.ManagePedidoModule)
            }

        ])
    ],
    exports: [ListPedidosComponent]
})
export class ListPedidosModule {};
