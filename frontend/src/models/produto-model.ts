export class Produto {
    private id: number;
    private nome: string;
    private descricao: string;
    private preco_unitario: number;

    constructor(id: number, nome: string, descricao: string, preco_unitario: number) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco_unitario = preco_unitario;
    }

    getNome(): string {
        return this.nome;
    }

    getDescricao(): string {
        return this.descricao;
    }

    getPrecoUnitario(): number {
        return this.preco_unitario;
    }

    setNome(nome: string): void {
        this.nome = nome;
    }

    setDescricao(descricao: string): void {
        this.descricao = descricao;
    }

    setPrecoUnitario(preco_unitario: number): void {
        this.preco_unitario = preco_unitario;
    }

    toJSON(): object {
        return {
          nome: this.nome,
          descricao: this.descricao,
          preco_unitario: this.preco_unitario
        };
    }
}
