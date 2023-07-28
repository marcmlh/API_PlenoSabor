import { v4 as uuidV4 } from "uuid";
import {
  CreateParams,
  IItemsListRepository,
} from "../../modules/itemsList/repositories/IItemsListRepository";
import { ItemsList } from "../../modules/itemsList/entities/ItemsList";

export class InMemoryItemsListRepository implements IItemsListRepository {
  public items: ItemsList[] = [];

  async create(params: CreateParams): Promise<ItemsList> {
    const {
      order_id,
      product_id,
      product_name,
      unit_price,
      quantity,
      details,
      total,
    } = params;

    let itemList: ItemsList = {
      itemList_id: uuidV4(),
      order_id,
      product_id,
      product_name,
      unit_price,
      quantity,
      details,
      total,
    };

    this.items.push(itemList);

    return itemList;
  }

  async findByItemListId(itemList_id: string): Promise<ItemsList> {
    return this.items.find((itemList) => itemList.itemList_id === itemList_id);
  }

  async findByIds(order_id: string, product_id: string): Promise<ItemsList> {
    return this.items.find(
      (ItemsList) =>
        ItemsList.order_id === order_id && ItemsList.product_id === product_id
    );
  }

  async deleteByItemListId(itemList_id: string): Promise<void> {
    const itemsList = this.items.filter(
      (itemsList) => itemsList.itemList_id !== itemList_id
    );

    this.items = itemsList;
  }

  async findByListId(order_id: string): Promise<ItemsList[]> {
    return this.items.filter((itemsList) => itemsList.order_id === order_id);
  }

  async patch({
    itemList_id,
    order_id,
    product_id,
    quantity,
    details,
    total,
  }): Promise<void> {
    let itemsList = this.items.map((itemList) => {
        if (itemList.itemList_id === itemList_id) {
      itemList.order_id = order_id,
      itemList.product_id= product_id,
      itemList.quantity= quantity,
      itemList.details = details,
      itemList.total= total
        };
      return itemList;
    });

    this.items = itemsList;
  }
}
