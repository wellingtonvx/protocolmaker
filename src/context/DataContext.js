import { createContext, useState } from "react";
import { itemSchema } from "../utils/YupSchemas";
import { toast } from "react-toastify";
import { v4 } from "uuid";

export const DataContext = createContext({});

export function DataContextProvider({ children }) {
  const [items, setItems] = useState([]);

  async function handleAddData(data) {
    try {
      if (data.patrimonio === "undefined" || "null") {
        data.patrimonio = "S/N";
      }
      await itemSchema.validate(data, { abortEarly: false });
      let id = v4();
      data = { ...data, id };

      setItems((item) => [...item, data]);
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
