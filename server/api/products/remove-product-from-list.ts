import { getProductsByList } from "./get-products-by-list/[listId]";

export default eventHandler(async (event) => {
    const { productId, listId } = await getQuery(event);
  
    try {
      const db = hubDatabase();
      if (!productId || !listId)
        throw new Error("Pet and owner names required");

      await db
        .prepare(
          'DELETE FROM list_products WHERE product = ?1 AND list = ?2;'
        )
        .bind(productId, listId)
        .run();

        return await getProductsByList(String(listId))
    } catch (e) {
      console.error(e);
    }
  });
  