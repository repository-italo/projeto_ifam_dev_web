import { Injectable } from "@angular/core";
import { Cliente } from "src/models/cliente-model";

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    getClientes(): void {
        //return this.clientes;
    }

    getClienteById(id: number): void {
        //return this.clientes.find(cliente => cliente.id === id);
    }

    addCliente(cliente: any): void {
       // this.clientes.push(cliente);
    }

    updateCliente(id: number, updatedCliente: any): void {
        //const index = this.clientes.findIndex(cliente => cliente.id === id);
        //if (index !== -1) {
        //    this.clientes[index] = updatedCliente;
      //  }
    }
}
