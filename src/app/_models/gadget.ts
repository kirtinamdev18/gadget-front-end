export class Gadget {
    id?: number;
    title?: string;
    description?: string;
    price?: string;
    status?: string;
    checked?: boolean;
}

export interface GadgetTable {
    data: Gadget[];
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  }