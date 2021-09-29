import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Form } from "@unform/web";

import { CreateProtocol } from "../components/JsPDF";
import { Forms } from "../components/Form";

import { DataContext } from "../context/DataContext";

import Input from "../components/Form/Input";
import Select from "../components/Form/Select";
import Header from "../components/Header";

import { Ti, Sedes } from "../utils/data";

import styles from "../styles/Home.module.scss";
import { infoSchema } from "../utils/YupSchemas";

export default function Home() {
  const [infos, setInfos] = useState();
  const [protocolNumber, setProtocolNumber] = useState();
  const [yearProtocol, setYearProtocol] = useState("2021");

  const { items, handleSetItems } = useContext(DataContext);

  console.log(infos);
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
      error.errors.map((err) => toast.error(err.msg));
    }
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.protocol}>
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
      <div className={styles.itemsAdd}>
        <h2>Itens Adicionados</h2>

        {items.map((item, index) => (
          <ul key={index}>
            <li>{item.qtd}</li>
            <li>{item.material}</li>
            <li>{item.configuracao}</li>
            <li>{item.motivo}</li>
            <li>{item.patrimonio}</li>
            <li>
              <button onClick={handleDeleteItem}>X</button>
            </li>
          </ul>
        ))}
      </div>

      {/**Escolhendo a sede de destino e a remetente */}
      <Form onSubmit={handleAddInfo} className={styles.remetentInfo}>
        <div>
          <ul>
            <li>Sede Remetente: </li>
            <li>Sede Destino: </li>
            <li>Remetente: </li>
            <li>Ti remetente: </li>
            <li>Destinatário: </li>
            <li>Ti destinatário: </li>
          </ul>
          <ul>
            <li>
              <Select name="sedeRemetente">
                {Sedes.map((sede) => (
                  <option key={sede}>{sede}</option>
                ))}
              </Select>
            </li>
            <li>
              <Select name="sedeDestino">
                {Sedes.map((sede) => (
                  <option key={sede}>{sede}</option>
                ))}
              </Select>
            </li>
            <li>
              <Input name="tecRemetente" />
            </li>
            <li>
              <Select name="tiRemetente">
                {Ti.map((sede) => (
                  <option key={sede}>{sede}</option>
                ))}
              </Select>
            </li>
            <li>
              <Input name="tecDestinatario" />
            </li>
            <li>
              <Select name="sedeDestinatario">
                {Ti.map((sede) => (
                  <option key={sede}>{sede}</option>
                ))}
              </Select>
            </li>
          </ul>
        </div>

        <button type="submit" onClick={handleAddInfo}>
          guardar informações
        </button>
      </Form>

      <div className={styles.makeProtocol}>
        <button onClick={handleCreateProtocol}>Gerar protocolo</button>
      </div>
    </div>
  );
}
