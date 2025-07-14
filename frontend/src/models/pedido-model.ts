import { BaseModel } from "./base-model";
import { ItemPedido } from "./item-pedido-model";

export class Pedido extends BaseModel<Pedido> {
    cliente!: number;

    constructor(model: Partial<Pedido>) {
        super(model);
    }
}
