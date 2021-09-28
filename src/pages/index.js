import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Form } from "@unform/web";

import { CreateProtocol } from "../components/JsPDF";
import { Forms } from "../components/Form";

import { DataContext } from "../context/DataContext";

import Input from "../components/Form/Input";
import Select from "../components/Form/Select";
import Header from "../components/Header";

import { Sedes, Ti } from "../utils/data";

import styles from "../styles/Home.module.scss";

export default function Home() {
  const [infos, setInfos] = useState();
  const [protocolNumber, setProtocolNumber] = useState();
  const [yearProtocol, setYearProtocol] = useState("2021");

  const { items, handleSetItems } = useContext(DataContext);

  function handleAddInfo(data) {
    setInfos(data);
  }

  function handleDeleteItem(id) {
    const newDados = [...items];
    newDados.splice(id, 1);

    return handleSetItems([...newDados]);
  }

  async function handleCreateProtocol() {
    try {
      await infoSchema.validate(infos);

      CreateProtocol(items, infos, protocolNumber, yearProtocol);
    } catch (error) {
      console.log(error);
      toast.error("algumas informações estão em branco");
    }
  }

  return (
    <div className={styles.container}>
      <Header />
      <div>
        <span>Protocolo Nº: </span>
        <input
          type="number"
          onChange={(e) => setProtocolNumber(e.target.value)}
        />
        <span> / </span>
        <select name="year" onChange={(e) => setYearProtocol(e.target.value)}>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
      </div>

      <Forms />

      {/**Adicionando um item da lista */}

      <h2>Items Adicionados</h2>
      <div>
        <table c>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td style={{ marginRight: "2px" }}>{item.qtd}</td>
                <td style={{ marginRight: "2px" }}>{item.material}</td>
                <td style={{ marginRight: "2px" }}>{item.configuracao}</td>
                <td style={{ marginRight: "2px" }}>{item.motivo}</td>
                <td style={{ marginRight: "2px" }}>{item.patrimonio}</td>
                <td>
                  <button onClick={handleDeleteItem}>X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/**Escolhendo a sede de destino e a remetente */}
      <Form
        onSubmit={handleAddInfo}
        className="flex items-center justify-between px-20 py-5"
      >
        <Select name="sedeRemetente">
          {Sedes.map((sede) => (
            <option key={sede}>{sede}</option>
          ))}
        </Select>

        <Select name="sedeDestino">
          {Sedes.map((sede) => (
            <option key={sede}>{sede}</option>
          ))}
        </Select>

        <Select name="tiRemetente">
          {Ti.map((sede) => (
            <option key={sede}>{sede}</option>
          ))}
        </Select>
        <Select name="tiDestinatario">
          {Ti.map((sede) => (
            <option key={sede}>{sede}</option>
          ))}
        </Select>
        <Input name="tecRemetente" />
        <Input name="tecDestinatario" />
        <button type="submit" onClick={handleAddInfo}>
          guardar informações
        </button>
      </Form>

      <button
        className="bg-white border rounded"
        onClick={handleCreateProtocol}
      >
        Gerar protocolo
      </button>
    </div>
  );
}

// <div>
// <ul style={{ display: "flex", listStyle: "none" }}>
//   <li style={{ marginRight: "10px" }}>Qtd</li>
//   <li style={{ marginRight: "10px" }}>Material</li>
//   <li style={{ marginRight: "10px" }}>Configuração</li>
//   <li style={{ marginRight: "10px" }}>Motivo</li>
//   <li style={{ marginRight: "10px" }}>Patrimonio</li>
// </ul>
// {items.map((item, index) => {
//   return (
//     <ul key={index} style={{ display: "flex", listStyle: "none" }}>
//       <li style={{ marginRight: "10px" }}>{item.Qtd}</li>
//       <li style={{ marginRight: "10px" }}>{item.material}</li>
//       <li style={{ marginRight: "10px" }}>{item.configuracao}</li>
//       <li style={{ marginRight: "10px" }}>{item.motivo}</li>
//       <li style={{ marginRight: "10px" }}>{item.patrimonio}</li>
//       <button onClick={() => handleDeleteItem(index)}>X </button>
//     </ul>
//   );
// })}
// </div>
