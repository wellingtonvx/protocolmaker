import { useContext } from "react";
import { Form } from "@unform/web";
import Input from "./Input";
import { DataContext } from "../../context/DataContext";

import styles from "./styles.module.scss";

export function Forms() {
  const { handleAddData } = useContext(DataContext);
  return (
    <Form onSubmit={handleAddData} className={styles.container}>
      <div>
        <ul>
          <li>Qtd</li>
          <li>Material</li>
          <li>Configuracão</li>
          <li>Motivo</li>
          <li>Patrimônio</li>
        </ul>

        <ul>
          <li>
            <Input name="qtd" type="number" />
          </li>
          <li>
            <Input name="material" type="text" />
          </li>
          <li>
            <Input name="configuracao" type="text" />
          </li>
          <li>
            <Input name="motivo" type="text" />
          </li>
          <li>
            <Input name="patrimonio" type="number" />
          </li>
        </ul>
      </div>

      <button type="submit">Adicionar</button>
    </Form>
  );
}
