import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SharedModule } from 'src/app/shared/shared-module';
import { Cliente } from 'src/models/cliente-model';
import { ClienteService } from 'src/services/cliente.service';

@Component({
  selector: 'app-manage-cliente',
  templateUrl: './manage-cliente.component.html',
  styleUrls: ['./manage-cliente.component.scss']
})
export class ManageClienteComponent implements OnInit {

    form!: FormGroup;
    id: number | null = null;


    constructor (
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private clienteService: ClienteService,
        private router: Router,
        private messageService: MessageService,
    ) { }


    ngOnInit() {
        this.form = this.fb.group({
            nome: ['', Validators.required],
            sobrenome: ['', Validators.required],
            cpf: ['', Validators.required]
        });

        this.route.paramMap.subscribe(params => {
            const idParam = params.get('id');
            if (idParam) {
                this.id = +idParam;
                this.loadCliente(this.id);
            } else {
                this.id = null;
            }
    });

    }

    loadCliente(id: number) {
        this.clienteService.getById(id).subscribe(cliente => {
            this.form.patchValue({
                nome: cliente.nome,
                sobrenome: cliente.sobrenome,
                cpf: cliente.cpf
            });
        });
    }

    onSubmit() {
        if (this.form.invalid) return;

        const clienteData: Partial<Cliente> = this.form.value;

        if (this.id) {
            this.clienteService.update(this.id, clienteData).subscribe({
                next: () => {
                    console.log('Cliente atualizado:', clienteData);
                    this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Cliente atualizado com sucesso!'});
                },
                error: (error) => {
                    console.error('Erro ao atualizar cliente:', error);
                    this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar cliente.'});
                }
            });
        } else {
            this.clienteService.create(clienteData).subscribe({
                next: () => {
                    this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Cliente adicionado com sucesso!'});
                },
                error: (error) => {
                    console.error('Erro ao adicionar cliente:', error);
                    this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao adicionar cliente.'});
                }
            })
        }
    }

    redirectToList() {
        this.router.navigate(['/clientes']);
    }


}

@NgModule({
    declarations: [ManageClienteComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([
            {path: '', component: ManageClienteComponent}
        ])
    ],
})
export class ManageClienteModule { }
