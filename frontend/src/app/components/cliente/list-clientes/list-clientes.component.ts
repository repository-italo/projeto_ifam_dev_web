import { CommonModule } from '@angular/common';
import { Component, OnInit, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import {ConfirmationService, MessageService} from 'primeng/api';

import { Cliente } from 'src/models/cliente-model';
import { ClienteService } from 'src/services/cliente.service';
import { SharedModule } from 'src/app/shared/shared-module';

@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.scss']
})
export class ListClientesComponent implements OnInit {

    public clientes: Cliente[] = [];
    subscriptions: Subscription = new Subscription();

    httpError: string | null = null;
    isFetching: boolean = false;


    constructor(
        private clienteService: ClienteService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private router: Router
    ) { }


    ngOnInit() {
        this.fetchClientes();
    }

    fetchClientes() {
        this.isFetching = true;
        this.subscriptions.add(
            this.clienteService.get().subscribe({
                next: (clientes) => {
                    this.clientes = clientes;
                    this.httpError = null;
                    this.isFetching = false;
                },
                error: (error) => {
                    console.error('Erro ao carregar clientes:', error);
                    this.httpError = 'Erro ao carregar clientes. Tente novamente mais tarde.';
                    this.isFetching = false;
                }
            })
        )
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    confirmDeletion (cliente: Cliente) {
        this.confirmationService.confirm({
            message: `Você tem certeza que deseja excluir o cliente ${cliente.nome} ${cliente.sobrenome}?`,
            header: 'Confirmação de Exclusão',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.subscriptions.add(this.clienteService.delete(cliente.id).subscribe({
                    next: () => {
                        this.clientes = this.clientes.filter(c => c.id !== cliente.id);
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: `Cliente ${cliente.nome} ${cliente.sobrenome} excluído com sucesso!`
                        })
                    },
                    error: (error) => {
                        console.error('Erro ao excluir cliente:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: `Não foi possível excluir o cliente ${cliente.nome} ${cliente.sobrenome}. Tente novamente mais tarde.`
                        })
                    }
                }));
            }
        })
    }

    redirectToManage(cliente?: Cliente) {
        if (cliente) {
            this.router.navigate(['/clientes/manage', cliente.id]);
        } else {
            this.router.navigate(['/clientes/manage']);
        }
    }

}

@NgModule({
    declarations: [ListClientesComponent],
    imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
        {
            path: '',
            component: ListClientesComponent
        },
        {
            path: 'manage/:id',
            loadChildren: () => import('../manage-cliente/manage-cliente.component').then(m => m.ManageClienteModule)
        },
        {
            path: 'manage',
            loadChildren: () => import('../manage-cliente/manage-cliente.component').then(m => m.ManageClienteModule)
        }
    ]),
],
    exports: [ListClientesComponent]
})
export class ListClientesModule { }
