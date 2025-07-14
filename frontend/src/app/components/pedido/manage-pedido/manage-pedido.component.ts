import { CommonModule } from '@angular/common';
import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { throws } from 'assert';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { Subscription } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared-module';
import { Cliente } from 'src/models/cliente-model';
import { ItemPedido } from 'src/models/item-pedido-model';
import { Produto } from 'src/models/produto-model';
import { ClienteService } from 'src/services/cliente.service';
import { ItemPedidoService } from 'src/services/item-pedido.service';
import { PedidoService } from 'src/services/pedido.service';
import { ProdutoService } from 'src/services/produto.service';

@Component({
  selector: 'app-manage-pedido',
  templateUrl: './manage-pedido.component.html',
  styleUrls: ['./manage-pedido.component.scss']
})
export class ManagePedidoComponent implements OnInit, OnDestroy {
  clientes: Cliente[] = [];
  produtos: Produto[] = [];
  pedidoId: number | null = null;
  clienteSelecionado: Cliente | null = null;
  subscriptions = new Subscription()

  itemForm: Partial<ItemPedido> = { produto: 0, quantidade: 1, preco_unitario: 0 };
  itens: ItemPedido[] = [];
  itensToRemove: ItemPedido[] = [];

  constructor(
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private pedidoService: PedidoService,
    private itemPedidoService: ItemPedidoService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.subscriptions.add(
        this.route.paramMap.subscribe(params => {
          const id = params.get('id');
          if (id) {
              this.loadPedido(+id);
              this.pedidoId = +id;
          }
          })
      );

    this.subscriptions.add(
        this.clienteService.get().subscribe(clientes => this.clientes = clientes)
    );
    this.subscriptions.add(
        this.produtoService.get().subscribe(produtos => this.produtos = produtos)
    );
    if (this.pedidoId) {
        this.subscriptions.add(
            this.itemPedidoService.get().subscribe(itens => this.itensToRemove = itens.filter(item => item.pedido === this.pedidoId))
        );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  adicionarItem() {
    if (
      this.itemForm.produto !== undefined &&
      this.itemForm.produto !== null &&
      this.itemForm.quantidade !== undefined &&
      this.itemForm.quantidade > 0
    ) {
      const produtoSelecionado = this.produtos.find(p => p.id === this.itemForm.produto);
      if (produtoSelecionado) {
        const item = new ItemPedido({
          produto: produtoSelecionado.id,
          quantidade: this.itemForm.quantidade,
          preco_unitario: produtoSelecionado.preco_unitario, // exemplo: supondo que exista
        });

        this.itens.push(item);
        this.itemForm = { produto: 0, quantidade: 1, preco_unitario: 0 };
      }
    }
  }

  get total() {
    return this.itens.reduce((sum, item) => sum + (item.preco_unitario * item.quantidade), 0);
  }

  produtoById (id: number): Produto | undefined {
    return this.produtos.find(produto => produto.id === id);
  }

  loadPedido(id: number) {
    this.subscriptions.add(
        this.pedidoService.getById(id).subscribe(pedido => {
            this.clienteSelecionado = this.clientes.find(cliente => cliente.id === pedido.cliente) || null;
            this.itemPedidoService.get().subscribe(itens => {
                this.itens = itens.filter(item => item.pedido === pedido.id);
                console.log(this.itens);
            });
        })
    )

}

    salvarPedido() {
        if (this.clienteSelecionado && this.itens.length > 0) {
        const pedidoData = {
            cliente: this.clienteSelecionado.id,
        };
        if (this.pedidoId && typeof this.pedidoId === "number") {
            this.subscriptions.add(
                this.pedidoService.update(this.pedidoId, pedidoData).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Pedido Atualizado com Sucesso!'
                        });
                        // Remove os itens que foram marcados para remoção
                        for (const item of this.itensToRemove) {
                            this.itemPedidoService.delete(item.id).subscribe({
                                next: () => {
                                    console.log(`Item ${item.id} removido com sucesso.`);
                                }
                            });
                        }

                        this.itensToRemove = []; // Limpa os itens removidos após salvar
                        this.itemPedidoService.createMany(this.itens.map(item => ({
                            ...item,
                            pedido: this.pedidoId as number
                        }))).subscribe({
                            next: () => {
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Sucesso',
                                    detail: 'Itens do Pedido Atualizados com Sucesso!'
                                });
                                console.log('Itens do pedido atualizados:', this.itens);
                                this.itens = []; // Limpa os itens após salvar
                            }
                        });
                    },
                    error: (error) => {
                        console.error('Erro ao atualizar pedido:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Não foi possível atualizar o pedido. Tente novamente mais tarde.'
                        });
                    }
                })
            );
            return;
        }
        this.subscriptions.add(
            this.pedidoService.create(pedidoData).subscribe({
            next: (pedido) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Pedido Criado com Sucesso!'
                })

                this.itemPedidoService.createMany(this.itens.map(item => ({
                    ...item,
                    pedido: pedido.id
                }))).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Itens do Pedido Adicionados com Sucesso!'
                        });
                        console.log('Itens do pedido adicionados:', this.itens);
                        this.itens = []; // Limpa os itens após salvar
                    },
                    error: (error) => {
                        console.error('Erro ao adicionar itens ao pedido:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Não foi possível adicionar os itens ao pedido. Tente novamente mais tarde.'
                        });
                    }
                });
            }
        }))

    } else {
      console.error('Selecione um cliente e adicione itens ao pedido.');
    }
  }

  redirectToList() {
    this.router.navigate(['/pedidos']);
  }

  removerItem(index: number) {
    if (index > -1 && index < this.itens.length) {
      this.itens.splice(index, 1);
    }
  }
}

@NgModule({
    declarations: [ManagePedidoComponent],
    imports: [
        CommonModule,
        SharedModule,
        InputNumberModule,
        RouterModule.forChild([
            {path: '', component: ManagePedidoComponent}
        ])
    ]
})
export class ManagePedidoModule {}
