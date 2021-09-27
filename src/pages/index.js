import { useState } from "react";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { CreateProtocol } from "../components/JsPDF";

import Input from "../components/Form/Input";
import Select from "../components/Form/Select";
import { Sedes, Ti } from "../utils/data";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [items, setItems] = useState([]);
  const [infos, setInfos] = useState();
  const [protocolNumber, setProtocolNumber] = useState();
  const [yearProtocol, setYearProtocol] = useState("2021");

  const itemSchema = Yup.object().shape({
    material: Yup.string().required(),
    configuracao: Yup.string().required(),
    motivo: Yup.string().required(),
    patrimonio: Yup.string().required(),
  });

  const infoSchema = Yup.object().shape({
    sedeRemetente: Yup.string().required(),
    sedeDestino: Yup.string().required(),
    tiRemetente: Yup.string().required(),
    tiDestinatario: Yup.string().required(),
    tecRemetente: Yup.string().required(),
    tecDestinatario: Yup.string().required(),
  });

  async function handleAddData(data, { reset }) {
    try {
      await itemSchema.validate(data);

      setItems((item) => [...item, data]);

      reset();
    } catch (error) {
      toast.error("Todos os campos precisão estar preenchidos");
    }
  }

  function handleAddInfo(data) {
    setInfos(data);
  }

  function handleDeleteItem(id) {
    const newDados = [...items];
    newDados.splice(id, 1);

    return setItems([...newDados]);
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
      <h1>Protocolo Antares</h1>
      <h3>Protocolo de movimentação de equipamentos de TI</h3>
      <div>
        <span>Protocolo Nº</span>
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

      {/**Adicionando um item da lista */}
      <Form onSubmit={handleAddData}>
        <Input name="Qtd" type="number" placeholder="Quantidade" />
        <Input name="material" type="text" placeholder="Material" />
        <Input name="configuracao" type="text" placeholder="Configuração" />
        <Input name="motivo" type="text" placeholder="Motivo" />
        <Input name="patrimonio" type="number" placeholder="Patrimônio" />

        <button type="submit">Adicionar</button>
      </Form>

      {/**Escolhendo a sede de destino e a remetente */}
      <Form onSubmit={handleAddInfo}>
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

      <div>
        <ul style={{ display: "flex", listStyle: "none" }}>
          <li style={{ marginRight: "10px" }}>Qtd</li>
          <li style={{ marginRight: "10px" }}>Material</li>
          <li style={{ marginRight: "10px" }}>Configuração</li>
          <li style={{ marginRight: "10px" }}>Motivo</li>
          <li style={{ marginRight: "10px" }}>Patrimonio</li>
        </ul>
        {items.map((item, index) => {
          return (
            <ul key={index} style={{ display: "flex", listStyle: "none" }}>
              <li style={{ marginRight: "10px" }}>{item.Qtd}</li>
              <li style={{ marginRight: "10px" }}>{item.material}</li>
              <li style={{ marginRight: "10px" }}>{item.configuracao}</li>
              <li style={{ marginRight: "10px" }}>{item.motivo}</li>
              <li style={{ marginRight: "10px" }}>{item.patrimonio}</li>
              <button onClick={() => handleDeleteItem(index)}>X </button>
            </ul>
          );
        })}
      </div>
      <button onClick={handleCreateProtocol}>Gerar protocolo</button>
    </div>
  );
}
