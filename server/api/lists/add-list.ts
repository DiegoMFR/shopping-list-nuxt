export default eventHandler(async (event) => {
    const { listName, owner } = await getQuery(event);
  
    try {
      const db = hubDatabase();
  
      // TODO: move it as a Server Task
      await db.exec(
        "CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY, title TEXT, owner TEXT)"
      );
  
      if (!listName || !owner)
        throw new Error("Pet and owner names required");
  
      const result = await db
        .prepare(
          'INSERT INTO lists (title, owner) VALUES (?1, ?2) RETURNING id;'
        )
        .bind(listName, owner)
        .first();
    
        console.log(result);

      return result;
    } catch (e) {
      console.error(e);
    }
  });
  