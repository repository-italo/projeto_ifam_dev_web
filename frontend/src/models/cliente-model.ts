export class Cliente {
    private _id: string;
    private nome: string;
    private email: string;
    private cpf: string;

    constructor(id: string, nome: string, email: string, cpf: string) {
        this._id = id;
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
    }

    toJson(): object {
        return {
            id: this._id,
            nome: this.nome,
            email: this.email,
            cpf: this.cpf
        };
    }
}
