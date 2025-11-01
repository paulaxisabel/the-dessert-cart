export type Items = Array<{
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
}>;

export type Cart = Array<{
  name: string;
  quantity: number;
  price: number;
  image: string;
}>;

export type AuthProviderProps = {
  children: React.ReactNode;
};

export type DataContextValue = {
  cart: Cart;
  openModal: boolean;
  handleSetCart: (cart: Cart) => void;
  handleSetOpenModal: (val: boolean) => void;
};
