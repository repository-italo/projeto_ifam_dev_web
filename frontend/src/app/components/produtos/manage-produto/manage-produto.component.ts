import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SharedModule } from 'src/app/shared/shared-module';
import { ProdutoDTO } from 'src/models/produto-model';
import { ProdutoService } from 'src/services/produto.service';

@Component({
  selector: 'app-manage-produto',
  templateUrl: './manage-produto.component.html',
  styleUrls: ['./manage-produto.component.scss']
})
export class ManageProdutoComponent implements OnInit {

    form!: FormGroup;
    id: number | null = null;

    constructor(
        private fb: FormBuilder,
        private produtoService: ProdutoService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) { }

    ngOnInit(){
        this.form = this.fb.group({
            nome: ['', Validators.required],
            descricao: ['', Validators.required],
            preco_unitario: ['', Validators.required]
        })

        this.route.paramMap.subscribe(params => {
            const idParam = params.get('id');
            if (idParam) {
                this.id = +idParam;
                this.loadProduto(this.id);
            } else {
                this.id = null;
            }
        });
    }

    loadProduto (id: number) {
        this.produtoService.getProdutoById(id).subscribe(produto => {
            this.form.patchValue({
                nome: produto.nome,
                descricao: produto.descricao,
                preco_unitario: produto.preco_unitario
            })
        });
    }

    redirectToList() {
        this.router.navigate(['/produtos']);
    }

    onSubmit () {
        if (this.form.invalid) return;

        const produtoData: ProdutoDTO = this.form.value;

        if (this.id) {
            this.produtoService.update(this.id, produtoData).subscribe({
                next: (produto) => {
                    this.messageService.add({severity: 'success', summary: 'Sucesso', detail: `Produto ${produto.nome} atualizado com sucesso!`});
                },
                error: (error) => {
                    console.error('Erro ao editar produto:', error);
                    this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar produto.'});
                }
            })
        } else {
            this.produtoService.create(produtoData).subscribe({
                next: (produto) => {
                    this.messageService.add({severity: 'success', summary: 'Sucesso', detail: `Produto ${produto.nome} criado com sucesso!`});
                },
                error: (error) => {
                    console.error('Erro ao criar produto:', error);
                    this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao adicionar cliente.'});
                }
            })
        }
    }



}

@NgModule({
    declarations: [ManageProdutoComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([
            {path: '', component: ManageProdutoComponent}
        ])
    ]
})
export class ManageProdutoModule {}
