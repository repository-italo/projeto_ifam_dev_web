import { BaseModel } from "./base-model";

export class Pedido extends BaseModel<Pedido> {
    clienteId!: number;
    itens_pedidos!: ItemPedidoDTO[];

    constructor(model: Partial<Pedido>) {
        super(model);
    }
}
