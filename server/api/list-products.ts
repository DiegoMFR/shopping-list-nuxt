export default eventHandler(async ():Promise<ShoppingList> => {
    const db = hubDatabase();

    // TODO: move it a a Server Task
    await db.exec(
      "CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, icon TEXT)"
    );

    const { results } = await db
      .prepare("SELECT * from products")
      .all<ShoppingItem>();

      const res = results.map( (result):ShoppingItem => ({
        id: String(result.id),
        name: result.name,
        icon: result.icon,
      }))
    
      return res;
});
