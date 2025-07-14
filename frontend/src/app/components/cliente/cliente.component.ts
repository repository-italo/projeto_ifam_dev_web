import { Component, Input, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cliente } from 'src/models/cliente-model';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {
    @Input() cliente!: Cliente;
};

@NgModule({
    declarations: [ClienteComponent],
    imports: [
        RouterModule.forChild([
            {path: '', component: ClienteComponent}
        ])
    ],
    exports: [ClienteComponent]
})
export class ClienteModule {};
