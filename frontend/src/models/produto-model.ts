export class Produto {
    private _id: number;
    public nome: string;
    public descricao: string;
    public preco_unitario: number;

    constructor(id: number, nome: string, descricao: string, preco_unitario: number) {
        this._id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco_unitario = preco_unitario;
    }

    set id (id: number) {
        this._id = id;
    }

    get id(): number {
        return this._id;
    }

    toJSON(): object {
        return {
          nome: this.nome,
          descricao: this.descricao,
          preco_unitario: this.preco_unitario
        };
    }
}

export interface ProdutoDTO {
    nome: string;
    descricao: string;
    preco_unitario: number;
}
