import type { ShoppingList } from "../list-products";
import type { ListData } from "../lists";
import { getProductsByList } from "../products/get-products-by-list/[listId]";

export type ListDataWithProducts = ListData & {
  products: ShoppingList;
};

export default eventHandler(async (event) => {
  const db = hubDatabase();
  const id = getRouterParam(event, "id") || "unknown";
  const data = await db
    .prepare(`SELECT id, title, owner FROM Lists WHERE id=${id}`)
    .first();

  if (!data) {
    throw createError({
      statusCode: 404,
      message: "List not found",
    });
  }

  const { title, owner } = data as { title: string; owner: string };

  const products = await getProductsByList(id);

  const listData: ListDataWithProducts = {
    id,
    title,
    owner,
    products,
  };

  console.log("aaa", listData);
  return listData;
});
