export type ListData = {
  title: string;
  id: string;
  owner: string;
};

export type ListDataList = {results : Array<ListData>};

export default eventHandler(async () => {

  try {

    const db = hubDatabase();

    // TODO: move it as a Server Task
    await db.exec('CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY, title TEXT, owner TEXT)')

    const { results }:ListDataList = await db.prepare('SELECT * from lists').all();
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(results);
      return results;

  } catch (e) {
    console.error(e);
  }
  })