import { useContext } from "react";
import { Form } from "@unform/web";
import Input from "./Input";
import { DataContext } from "../../context/DataContext";

export function Forms() {
  const { handleAddData } = useContext(DataContext);
  return (
    <Form onSubmit={handleAddData}>
      <table>
        <thead>
          <tr>
            <th>QTD</th>
            <th>Material</th>
            <th>Configuracão</th>
            <th>Motivo</th>
            <th>Patrimônio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Input name="qtd" type="number" />
            </td>
            <td>
              <Input name="material" type="text" />
            </td>
            <td>
              <Input name="configuracao" type="text" />
            </td>
            <td>
              <Input name="motivo" type="text" />
            </td>
            <td>
              <Input name="patrimonio" type="number" />
            </td>
          </tr>
        </tbody>
      </table>

      <button type="submit">Adicionar</button>
    </Form>
  );
}
