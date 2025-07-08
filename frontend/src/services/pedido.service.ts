import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class PedidoService {

    constructor() {}

    getPedidos(): void {
        //return this.pedidos;
    }

    getPedidoById(id: number): any {
        //return this.pedidos.find(pedido => pedido.id === id);
    }

    addPedido(pedido: any): void {
    //   this.pedidos.push(pedido);
    }

    updatePedido(id: number, updatedPedido: any): void {
/*         const index = this.pedidos.findIndex(pedido => pedido.id === id);
        if (index !== -1) {
        this.pedidos[index] = updatedPedido;
        } */
    }

    deletePedido(id: number): void {
        //this.pedidos = this.pedidos.filter(pedido => pedido.id !== id);
    }
}
