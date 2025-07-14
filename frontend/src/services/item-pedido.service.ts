import { ItemPedido } from "src/models/item-pedido-model";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class ItemPedidoService extends BaseService<ItemPedido>{
    constructor (http: HttpClient) {
        super(
            http,
            ItemPedido,
            "itens_pedidos"
        )
    }

    createMany(itens: ItemPedido[]) {
        console.log('Criando múltiplos itens de pedido:', itens);
        return this.http.post<ItemPedido[]>(`${this.BASE_URL}/${this.endpoint}/bulk_create/`, itens);
    }
}
