class Pedido {
    private id: number;
    private clienteId: number;
    private dataPedido: Date;

    constructor(id: number, clienteId: number, dataPedido: Date, status: string, total: number) {
        this.id = id;
        this.clienteId = clienteId;
        this.dataPedido = dataPedido;
    }

    getId(): number {
        return this.id;
    }

    getClienteId(): number {
        return this.clienteId;
    }

    getDataPedido(): Date {
        return this.dataPedido;
    }

    setClienteId(clienteId: number): void {
        this.clienteId = clienteId;
    }

    setDataPedido(dataPedido: Date): void {
        this.dataPedido = dataPedido;
    }

    toJson(): object {
        return {
            id: this.id,
            clienteId: this.clienteId,
            dataPedido: this.dataPedido.toISOString(),
        };
    }
}
