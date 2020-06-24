import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { Equipos } from "../models/equipos";

@Injectable({
  providedIn: "root"
})
export class EquiposService {

resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = "https://pavii.ddns.net/api/equipos";
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  post(obj:Equipos) {
    return this.httpClient.post(this.resourceUrl, obj);
  }
}