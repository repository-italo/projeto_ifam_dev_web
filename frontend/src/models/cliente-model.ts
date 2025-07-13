export class Cliente {
    private _id: number;
    public nome: string;
    public email: string;
    public cpf: string;

    constructor(id: number, nome: string, email: string, cpf: string) {
        this._id = id;
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
    }

    get id(): number {
        return this._id;
    }

    toJson(): object {
        return {
            nome: this.nome,
            email: this.email,
            cpf: this.cpf
        };
    }
}
