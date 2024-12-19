import type { ListDataList } from "~/types";


export default eventHandler(async () => {
  try {
    const db = hubDatabase();

    // TODO: move it as a Server Task
    await db.exec(
      "CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY, title TEXT, owner TEXT)"
    );

    const { results }: ListDataList = await db
      .prepare("SELECT * from lists")
      .all();
    return results;
  } catch (e) {
    console.error(e);
  }
});
