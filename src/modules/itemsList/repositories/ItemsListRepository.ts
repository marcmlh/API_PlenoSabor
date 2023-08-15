import { Repository } from "typeorm";
import { dataSource } from "../../../database/data-source";
import { ItemsList } from "../entities/ItemsList";
import { CreateParams, IItemsListRepository } from "./IItemsListRepository";

export class ItemsListRepository implements IItemsListRepository{
  private repository: Repository<ItemsList>;

  constructor() {
    this.repository = dataSource.getRepository(ItemsList);
  }

  async create(params: CreateParams): Promise<ItemsList> {
    const { order_id, product_id, product_name, unit_price, quantity, details, total } =
      params;

    const item = this.repository.create({
      order_id,
      product_id,
      product_name,
      unit_price,
      quantity,
      details,
      total,
    });

    await this.repository.save(item);

    return item;
  }

  async findByItemListId(itemList_id: string): Promise<ItemsList> {
    const item = await this.repository.findOneBy({ itemList_id });
    return item;
  }

  async findByIds(order_id: string, product_id: string): Promise<ItemsList> {
    const item = await this.repository.findOneBy({ order_id, product_id });
    return item;
  }

  async deleteByItemListId(itemList_id: string): Promise<void> {
    await this.repository.delete({ itemList_id });
  }

  async findByListId(order_id: string): Promise<ItemsList[]> {
    const items_list = await this.repository.find({
      where: {
        order_id,
      },
    });

    return items_list;
  }

  async patch({
    itemList_id,
    order_id,
    product_id,
    quantity,
    total,
    details
  }): Promise<void> {
    const item = await this.repository.create({
      itemList_id,
      order_id,
      product_id,
      quantity,
      total,
      details
    });

    await this.repository.update(itemList_id, item);
  }
}
