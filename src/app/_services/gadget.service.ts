import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Gadget, GadgetTable } from '@app/_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GadgetService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Gadget[]>(`${environment.apiUrl}/gadgets`);
    }

    getGadget(gadgetId: number) {
      return this.http.get<Gadget[]>(`${environment.apiUrl}/gadgets/getSingle/${gadgetId}`);
  }

    getGadgets(
        pageNumber: Number,
        pageSize: Number
      ): Observable<GadgetTable> {    
      return this.http.get<GadgetTable>(`${environment.apiUrl}/gadgets?page=${pageNumber}&per_page=${pageSize}`);
    }

    saveNew(gadgetData: any) {
      return this.http.post<Gadget[]>(`${environment.apiUrl}/gadgets/saveNew`, gadgetData);
    }

    update(gadgetData: any) {
      return this.http.post<Gadget[]>(`${environment.apiUrl}/gadgets/update`, gadgetData);
    }

    deleteGadget(gadgetId: number) {
      return this.http.delete(`${environment.apiUrl}/gadgets/delete/${gadgetId}`);
    }

    deleteMultipleGadget(gadgetIds: any) {
      return this.http.post(`${environment.apiUrl}/gadgets/deleteMultiple`, gadgetIds);
    }
}