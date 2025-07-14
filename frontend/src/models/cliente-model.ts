export class Cliente {
    private _id: number;
    public nome: string;
    public sobrenome: string;
    public cpf: string;

    constructor(id: number, nome: string, sobrenome: string, cpf: string) {
        this._id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.cpf = cpf;
    }

    get id(): number {
        return this._id;
    }

    toJson(): object {
        return {
            nome: this.nome,
            sobrenome: this.sobrenome,
            cpf: this.cpf
        };
    }
}

export interface ClienteDTO {
    nome: string;
    sobrenome: string;
    cpf: string;
}
