import { BaseModel } from "./base-model";

export class ItemPedido extends BaseModel<ItemPedido> {
    pedido!: number;
    quantidade!: number;
    produto!: number;
    preco_unitario!: number;

    constructor(data: Partial<ItemPedido>) {
        super(data);
    }

}
