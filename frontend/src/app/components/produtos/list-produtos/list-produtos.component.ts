import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { Produto } from 'src/models/produto-model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared-module';
import { ProdutoService } from 'src/services/produto.service';
import { Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-produtos',
  templateUrl: './list-produtos.component.html',
  styleUrls: ['./list-produtos.component.scss']
})
export class ListProdutosComponent implements OnInit, OnDestroy {

    produtos: Produto[] = [];
    isFetching: boolean = false;
    httpError: string | null = null;
    subscriptions: Subscription = new Subscription();

    constructor(
        private produtoService: ProdutoService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
    ) { }

    ngOnInit() {
        this.fetchProdutos();
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    fetchProdutos() {
        this.isFetching = true
        this.subscriptions.add(
            this.produtoService.get().subscribe({
                next: (produtos) => {
                    this.produtos = produtos;
                    this.isFetching = false;
                },
                error: (error) => {
                    console.error('Erro ao carregar produtos:', error);
                    this.httpError = 'Erro ao carregar produtos. Tente novamente mais tarde.';
                }
            })
        );
    }

    redirectToManage(produto?: Produto) {
        if (produto) {
            this.router.navigate(['/produtos/manage', produto.id]);
        } else {
            this.router.navigate(['/produtos/manage'])
        }
    }

    confirmDeletion(produto: Produto) {
        this.confirmationService.confirm({
            message: `Você tem certeza que deseja excluir o produto ${produto.nome}?`,
            header: 'Confirmação de Exclusão',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.produtoService.delete(produto.id).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: `Produto ${produto.nome} excluído com sucesso!`
                        });
                        this.produtos = this.produtos.filter(p => p.id !== produto.id);
                    },
                    error: () => {
                        console.log("Erro ao excluir produto");
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: `Erro ao excluir Produto ${produto.nome}.`
                        })
                    }
                })
            }
        })
    }


}
@NgModule({
  declarations: [ListProdutosComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
        {
            path: '',
            component: ListProdutosComponent
        },
        {
            path: 'manage/:id',
            loadChildren: () => import('../manage-produto/manage-produto.component').then(m => m.ManageProdutoModule),
        },
        {
            path: 'manage',
            loadChildren: () => import('../manage-produto/manage-produto.component').then(m => m.ManageProdutoModule),
        }
    ])

],
  exports: [ListProdutosComponent]
})
export class ListProdutosModule {};
