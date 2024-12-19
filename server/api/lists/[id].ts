import { getProductsByList } from "~/server/utils";
import type { ListData } from "~/types";

export default eventHandler(async (event) => {
  const db = hubDatabase();
  const id = getRouterParam(event, "id") || "unknown";
  const data = await db
    .prepare(`SELECT id, title, owner FROM lists WHERE id=${id}`)
    .first();

  if (!data) {
    throw createError({
      statusCode: 404,
      message: "List not found",
    });
  }

  const { title, owner } = data as { title: string; owner: string };

  const products = await getProductsByList(id);

  const listData: ListData = {
    id,
    title,
    owner,
    products,
  };

  console.log("aaa", listData);
  return listData;
});
