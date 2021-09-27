import { useState } from "react";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

import { headers } from "../components/JsPDF";

import styles from "../styles/Home.module.css";
import Input from "../components/Form/Input";
import Select from "../components/Form/Select";

export default function Home() {
  const [dados, setDados] = useState([]);
  const doc = jsPDF();

  const schema = Yup.object().shape({
    material: Yup.string().required(),
    configuracao: Yup.string().required(),
    motivo: Yup.string().required(),
    patrimonio: Yup.string().required(),
  });

  async function handleAddData(data, { reset }) {
    try {
      await schema.validate(data);

      setDados((dado) => [...dado, data]);

      reset();
    } catch (error) {
      toast.error("Todos os campos precisão estar preenchidos");
    }
  }

  function handleDeleteItem(id) {
    const newDados = [...dados];
    newDados.splice(id, 1);

    return setDados([...newDados]);
  }

  function handleCreateProtocol() {
    const data = dados.map((item) => Object.values(item));
    doc.addImage("/images/logo.png", "png", 10, 10, 30, 15);
    doc.autoTable(headers, data, {
      margin: { top: 40 },
      headStyles: {
        halign: "center",
        fontSize: 12,
        lineColor: "#000",
        lineWidth: 0.3,
        fillColor: false,
        textColor: "#000",
      },
      bodyStyles: {
        textColor: "#000000",
        cellPadding: 1,
        halign: "center",
        valign: "middle",
        lineColor: "#000",
        lineWidth: 0.1,
      },
    });
    doc.save(`alguma coisa.pdf`);
  }

  return (
    <div className={styles.container}>
      <h1>Protocolo Antares</h1>
      <h3>Protocolo de movimentação de equipamentos de TI</h3>

      <Form onSubmit={handleAddData}>
        <Input name="Qtd" type="number" />
        <Input name="material" type="text" />
        <Input name="configuracao" type="text" />
        <Input name="motivo" type="text" />
        <Input name="patrimonio" type="number" />

        <Select name="sede" />

        <button type="submit">Enviar</button>
      </Form>

      <div>
        <ul style={{ display: "flex", listStyle: "none" }}>
          <li style={{ marginRight: "10px" }}>Qtd</li>
          <li style={{ marginRight: "10px" }}>Material</li>
          <li style={{ marginRight: "10px" }}>Configuração</li>
          <li style={{ marginRight: "10px" }}>Motivo</li>
          <li style={{ marginRight: "10px" }}>Patrimonio</li>
        </ul>
        {dados.map((item, index) => {
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
