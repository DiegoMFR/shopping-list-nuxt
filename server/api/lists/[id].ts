import type { ListData } from "../lists";
import type { ShoppingItem } from "../products";

export type ListDataWithProducts = ListData & {
    products: Set<ShoppingItem | null>;
  };
  
export default eventHandler(async (event) => {
    const db = hubDatabase();
    const id = getRouterParam(event, 'id') || 'unknown';
    const data = await db.prepare(`SELECT id, title, owner FROM Lists WHERE id=${id}`).first();

    if (!data) {
        throw createError({
            statusCode: 404,
            message: 'List not found'
        });
    }

    const { title, owner } = data as { title: string; owner: string };

    const listData: ListDataWithProducts = {
        id,
        title,
        owner,
        products: new Set(),
        // products: await getProductsForList(id),
    };
    return listData;
})
