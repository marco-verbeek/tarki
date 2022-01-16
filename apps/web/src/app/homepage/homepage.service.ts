import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ItemSearchResult } from 'tarki-definitions';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  constructor(private http: HttpClient) { }

  searchItem(itemName: string): Promise<ItemSearchResult[]> {
    return lastValueFrom(this.http.get<ItemSearchResult[]>('/api/items/' + itemName))
  }
}
