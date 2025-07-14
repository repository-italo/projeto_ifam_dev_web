import { ItemPedido } from "src/models/item-pedido-model";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";

export class ItemPedidoService extends BaseService<ItemPedido>{
    constructor (http: HttpClient) {
        super(
            http,
            ItemPedido,
            "item-pedidos"
        )
    }
}
