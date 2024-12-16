export default eventHandler(async (event) => {
    const { productId, listId } = await readBody(event);
  
    try {
      const db = hubDatabase();
  
      // TODO: move it as a Server Task
      await db.exec(
        "CREATE TABLE IF NOT EXISTS list_products (id INTEGER PRIMARY KEY, product TEXT, list TEXT)"
      );
  
      if (!productId || !listId)
        throw new Error("Pet and owner names required");

      await db
        .prepare(
          'INSERT INTO list_products (product, list) VALUES (?1, ?2);'
        )
        .bind(String(productId), String(listId))
        .run();
    } catch (e) {
      console.error(e);
    }
  });
  