import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {

  constructor() {}

  getProdutos(): void {
   // return this.produtos;
  }

  getProdutoById(id: number): any {
    //return this.produtos.find(produto => produto.id === id);
  }

  addProduto(produto: any): void {
   // this.produtos.push(produto);
  }

  updateProduto(id: number, updatedProduto: any): void {
   /*  const index = this.produtos.findIndex(produto => produto.id === id);
    if (index !== -1) {
      this.produtos[index] = updatedProduto;
    } */
  }

  deleteProduto(id: number): void {
  //  this.produtos = this.produtos.filter(produto => produto.id !== id);
  }
}
