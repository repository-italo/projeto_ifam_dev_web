class Pedido {
    private id: number;
    private clienteId: number;
    private itens_pedidos: ItemPedidoDTO[];
    private createdAt: Date;
    private updatedAt: Date;

    constructor(id: number, clienteId: number, updatedAt: string, createdAt: string, itens_pedidos: ItemPedidoDTO[] = []) {
        this.id = id;
        this.clienteId = clienteId;
        this.itens_pedidos = itens_pedidos;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
    }

    getId(): number {
        return this.id;
    }

    getClienteId(): number {
        return this.clienteId;
    }

    setClienteId(clienteId: number): void {
        this.clienteId = clienteId;
    }

    getItensPedidos(): ItemPedidoDTO[] {
        return this.itens_pedidos;
    }

    getPrecoTotal(): number {
        return this.itens_pedidos.reduce((total, item) => total + (item.precoUnitario * item.quantidade), 0);
    }

    setItensPedidos(itens_pedidos: ItemPedidoDTO[]): void {
        this.itens_pedidos = itens_pedidos;
    }

    addItemPedido(item: ItemPedidoDTO): void {
        this.itens_pedidos.push(item);
    }

    removeItemPedido(itemId: number): void {
        this.itens_pedidos = this.itens_pedidos.filter(item => item.id !== itemId);
    }

    removeAllItensPedidos(): void {
        this.itens_pedidos = [];
    }

    toJson(): object {
        return {
            clienteId: this.clienteId,
            itens_pedidos: this.itens_pedidos.map(item => ({
                produtoId: item.produtoId,
                pedidoId: item.pedidoId,
                quantidade: item.quantidade,
                precoUnitario: item.precoUnitario
            })),
        };
    }
}
