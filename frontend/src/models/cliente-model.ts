import { BaseModel } from "./base-model";

export class Cliente extends BaseModel<Cliente> {
    public nome!: string;
    public sobrenome!: string;
    public cpf!: string;

    constructor(model: Partial<Cliente>) {
        super(model);
    }

}
