import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { Produto, ProdutoDTO } from "src/models/produto-model";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ProdutoService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getProdutos() {
   return this.http.get<Produto[]>(`${this.BASE_URL}/produtos/`).pipe(
        map((produtos) => produtos.map(produto => new Produto(produto.id, produto.nome, produto.descricao, produto.preco_unitario)))
   )
  }

  getProdutoById(id: number) {
    return this.http.get<Produto>(`${this.BASE_URL}/produtos/${id}/`).pipe(
      map(produto => new Produto(produto.id, produto.nome, produto.descricao, produto.preco_unitario))
    );
  }

  create(produto: ProdutoDTO) {
    return this.http.post<Produto>(`${this.BASE_URL}/produtos/`, produto).pipe(
      map(produto => new Produto(produto.id, produto.nome, produto.descricao, produto.preco_unitario))
    )
  }

  update(id: number, updatedProduto: any) {
    return this.http.put<Produto>(`${this.BASE_URL}/produtos/${id}/`, updatedProduto).pipe(
        map(produto => new Produto(produto.id, produto.nome, produto.descricao, produto.preco_unitario))
    );
  }

    delete(id: number) {
        return this.http.delete(`${this.BASE_URL}/produtos/${id}/`);
    }
}
