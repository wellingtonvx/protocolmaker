import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { Form } from "@unform/web";
import Input from "../components/Form/Input";
import Select from "../components/Form/Select";

export default function Home() {
  const [dados, setDados] = useState([]);

  function handleAddData(data) {
    setDados([...dados, data]);

    console.log(dados);
  }

  function handleDeleteItem(id) {
    const newDados = dados;
    newDados.splice(id, 1);

    return setDados(newDados);
  }

  useEffect(() => {}, [dados]);

  return (
    <div className={styles.container}>
      <h1>Protocolo Antares</h1>
      <h3>Protocolo de movimentação de equipamentos de TI</h3>

      <Form onSubmit={handleAddData}>
        <Input name="material" type="text" />
        <Input name="configuracao" type="text" />
        <Input name="motivo" type="text" />
        <Input name="patrimonio" type="number" />

        <Select name="sede" />

        <button type="submit">Enviar</button>
      </Form>

      <div>
        <ul style={{ display: "flex", listStyle: "none" }}>
          <li style={{ marginRight: "10px" }}>Material</li>
          <li style={{ marginRight: "10px" }}>Configuração</li>
          <li style={{ marginRight: "10px" }}>Motivo</li>
          <li style={{ marginRight: "10px" }}>Patrimonio</li>
        </ul>
        {dados.map((item, index) => {
          return (
            <ul key={index} style={{ display: "flex", listStyle: "none" }}>
              <li style={{ marginRight: "10px" }}>{item.material}</li>
              <li style={{ marginRight: "10px" }}>{item.configuracao}</li>
              <li style={{ marginRight: "10px" }}>{item.motivo}</li>
              <li style={{ marginRight: "10px" }}>{item.patrimonio}</li>
              <button onClick={() => handleDeleteItem(index)}>X </button>
            </ul>
          );
        })}
      </div>
    </div>
  );
}

/**
 * <form onSubmit={handleAddData}>
        <span>Material</span>
        <input type="text" onChange={(e) => setMaterial(e.target.value)} />
        <span>Configuração</span>
        <input type="text" onChange={(e) => setConfiguracao(e.target.value)} />
        <span>Motivo</span>
        <input type="text" onChange={(e) => setMotivo(e.target.value)} />
        <span>Nº Patrimônio</span>
        <input type="number" onChange={(e) => setPatrimonio(e.target.value)} />

        <button type="submit">Adicionar</button>
      </form>

      <ul>{data.map((item) => console.log(item.material))}</ul>
 */
