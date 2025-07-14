import { BaseModel } from "./base-model";

export class ItemPedido extends BaseModel<ItemPedido> {
    pedidoId!: number;
    quantidade!: number;
    produtoId!: number;
    clienteId!: number;

    constructor(data: Partial<ItemPedido>) {
        super(data);
    }

}
