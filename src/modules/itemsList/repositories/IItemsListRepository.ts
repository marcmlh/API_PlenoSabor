import { ItemsList } from "../entities/ItemsList";

export interface CreateParams {
  order_id: string;
  product_id: string;
  product_name: string;
  unit_price: number;
  quantity: number;
  details: string;
  total: number;
}

export interface PatchParams {
  itemList_id : string;
  order_id : string;
  product_id : string;
  quantity : number;
  details ?: string;
  total : number;
}

export interface IItemsListRepository {
  create(params: CreateParams): Promise<ItemsList>;
  findByItemListId(itemList_id: string): Promise<ItemsList>;
  findByIds(order_id: string, product_id: string): Promise<ItemsList>;
  deleteByItemListId(itemList_id: string): Promise<void>;
  findByListId(order_id: string): Promise<ItemsList[]>;
  patch(params: PatchParams): Promise<void>;
}
