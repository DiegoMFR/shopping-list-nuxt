export default eventHandler(async (event) => {
  const { productName, productIcon } = getQuery(event);

  try {
    const db = hubDatabase();

    // TODO: move it as a Server Task
    await db.exec(
      "CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, icon TEXT)"
    );

    if (!productName || !productIcon)
      throw new Error("Pet and owner names required");

    const result = await db
      .prepare(
        'INSERT INTO products (name, icon) VALUES (?1, ?2) RETURNING *;'
      )
      .bind(productName, productIcon)
      .first();

    return result;
  } catch (e) {
    console.error(e);
  }
});
