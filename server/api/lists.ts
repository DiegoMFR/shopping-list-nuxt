export default defineEventHandler(async (event) => {
    const db = hubDatabase();

    const { results } = await db.prepare('SELECT * from lists').all();

    return results
  })