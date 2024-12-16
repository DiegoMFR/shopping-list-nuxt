import type { ShoppingList } from "../../list-products";

interface ShoppingItem {
  id: string;
  name: string;
  icon: string;
}

export async function getProductsById(
    products: Array<string>
  ): Promise<ShoppingList | null> {
    const db = hubDatabase();
    const selectById = (listId: string) => db.prepare(`SELECT * FROM products WHERE id=${listId}`).first();
    
    const results = await Promise.all(products.map(product => selectById(product)))
    
    if (results.length === 0) {
      return null;
    }
    const res = results.map( result => {
        if (result) {
            return {
                id: result.id as string,
                name: result.name as string,
                icon: result.icon as string,
              };
        }
        return undefined;
    }).filter((product): product is ShoppingItem => product !== undefined);
  
    return res;
  }

  export async function getProductsByList(listId: string): Promise<ShoppingList> {
    const db = hubDatabase();
    await db.exec(
      "CREATE TABLE IF NOT EXISTS list_products (id INTEGER PRIMARY KEY, product TEXT, list TEXT)"
    );
    const { results } = await db.prepare(`SELECT * FROM list_products WHERE list=${listId}`).all();

    let response: ShoppingList = [];

    if (results) {
        const products = await getProductsById(results.map(row => row.product as string ?? null));

        if (products !== null) {
            response = products;
        }
    }
    return response;
  }

export default eventHandler(async (event) => {

  const listId = getRouterParam(event, 'listId') || 'unknown';

  return getProductsByList(listId)
    
});