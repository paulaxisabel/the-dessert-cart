import { createContext, useContext, useState } from "react";

import { AuthProviderProps, Cart, DataContextValue } from "./types";

const DataContext = createContext<DataContextValue | null>(null);

const DataProvider = ({ children }: AuthProviderProps) => {
  const [cart, setCart] = useState<Cart>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleSetCart = (cartData: Cart) => setCart(cartData);
  const handleSetOpenModal = (val: boolean) => setOpenModal(val);

  return (
    <DataContext.Provider
      value={{ cart, openModal, handleSetCart, handleSetOpenModal }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

export const UseDataContext = () => {
  const value = useContext(DataContext);
  if (value === null)
    throw new Error("'UseDataContext' should be used within a 'DataProvider'");
  return value;
};
