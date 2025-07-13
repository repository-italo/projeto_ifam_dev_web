import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cliente } from 'src/models/cliente-model';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {
    cliente: Cliente = new Cliente(1, 'Italo', 'Pinheiro', '1234567890');
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
