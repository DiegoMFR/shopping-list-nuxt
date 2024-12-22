type ShoppingItem = {
  name: string;
  id: string;
  icon: string;
};

type ListedProduct = {
  list: string;
  product: string;
};

type ShoppingList = Array<ShoppingItem>;

type ListData = {
  title: string;
  id: string;
  owner: string;
  products: ShoppingList;
};

type ListDataList = { results: Array<ListData> };

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
