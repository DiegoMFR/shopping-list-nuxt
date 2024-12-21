export type ShoppingItem = {
  name: string;
  id: string;
  icon: string;
};

export type ListedProduct = {
  list: string;
  product: string;
};

export type ShoppingList = Array<ShoppingItem>;

export type ListData = {
  title: string;
  id: string;
  owner: string;
  products: ShoppingList;
};

export type ListDataList = { results: Array<ListData> };

declare module '#auth-utils' {
  interface User {
    id: number;
    email: string;
  }

  interface UserSession {
    startedAt: number;
  }

  interface SecureSessionData {
    startedAt: number;
  }

  interface Credential {
    userId: number;
    id: string;
    publicKey: string;
    counter: number;
    backedUp: number;
    transports: string;
  }
}
