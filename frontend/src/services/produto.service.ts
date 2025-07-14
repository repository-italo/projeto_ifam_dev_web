import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { Produto } from "src/models/produto-model";

@Injectable({
  providedIn: 'root',
})
export class ProdutoService extends BaseService<Produto> {

  constructor(http: HttpClient) {
    super(
        http,
        Produto,
        "produtos"
    );
  }

}
