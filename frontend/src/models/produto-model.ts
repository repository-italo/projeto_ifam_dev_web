import { BaseModel } from "./base-model";

export class Produto extends BaseModel<Produto> {
    nome!: string;
    descricao!: string;
    preco_unitario!: number;

    constructor(model: Partial<Produto>) {
        super(model);
    }

    toJSON(): object {
        return {
          nome: this.nome,
          descricao: this.descricao,
          preco_unitario: this.preco_unitario
        };
    }
}
