export type ShoppingItem = {
    name: string;
    id?: string;
    icon: string;
  };
  
  export type ListedProduct = {
    list: string;
    product: string;
  };
  
  export type ShoppingList = Set<ShoppingItem>;