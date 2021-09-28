import { createContext, useState } from "react";
import { itemSchema } from "../utils/YupSchemas";
import { toast } from "react-toastify";

export const DataContext = createContext({});

export function DataContextProvider({ children }) {
  const [items, setItems] = useState([]);

  console.log(items);

  async function handleAddData(data, { reset }) {
    try {
      await itemSchema.validate(data);

      setItems((item) => [...item, data]);

      reset();
    } catch (error) {
      error.errors.map((err) => toast.error(err.msg));
    }
  }

  function handleSetItems(data) {
    setItems(data);
  }

  return (
    <DataContext.Provider value={{ items, handleAddData, handleSetItems }}>
      {children}
    </DataContext.Provider>
  );
}
