import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Form } from "@unform/web";
import { RiDeleteBinLine } from "react-icons/ri";

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
  const [protocolNumber, setProtocolNumber] = useState(0);
  const [yearProtocol, setYearProtocol] = useState("2021");
  const [obs, setObs] = useState("");

  const { items, handleSetItems } = useContext(DataContext);

  async function handleAddInfo(data) {
    try {
      await infoSchema.validate(infos);
      setInfos(data);
      toast.success("Dados salvos");
    } catch (error) {
      error.errors.map((err) => toast.error(err.msg));
    }
  }

  function handleDeleteItem(id) {
    handleSetItems((items) => items.filter((el) => el.id !== id));
  }

  async function handleCreateProtocol() {
    try {
      await infoSchema.validate(infos);

      CreateProtocol(items, infos, protocolNumber, yearProtocol, obs);
    } catch (error) {
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
      <div className={styles.obs}>
        <span>Observações</span>
        <textarea
          name="observacao"
          type="text"
          onChange={(e) => setObs(e.target.value)}
        />
      </div>

      {/**Adicionando um item da lista */}
      <div className={styles.itemsAdd}>
        <h2>Itens Adicionados</h2>

        {items.map((item) => {
          return (
            <ul key={item.id}>
              <li>{item.qtd}</li>
              <li>{item.material}</li>
              <li>{item.configuracao}</li>
              <li>{item.setor}</li>
              <li>{item.motivo}</li>
              <li>{item.patrimonio}</li>
              <li>
                <button
                  style={{
                    background: "transparent",
                    cursor: "pointer",
                    borderRadius: "6px",
                  }}
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <RiDeleteBinLine width={20} heihgt={20} />
                </button>
              </li>
            </ul>
          );
        })}
      </div>

      {/**Escolhendo a sede de destino e a remetente */}
      <Form onSubmit={handleAddInfo} className={styles.remetentInfo}>
        <div>
          <ul className={styles.first}>
            <li>Sede Remetente: </li>
            <li>Sede Destino: </li>
            <li>Remetente: </li>
            <li>Ti remetente: </li>
            <li>Destinatário: </li>
            <li>Ti destinatário: </li>
          </ul>
          <ul className={styles.second}>
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
              <Select name="tiDestinatario">
                {Ti.map((sede) => (
                  <option key={sede}>{sede}</option>
                ))}
              </Select>
            </li>
          </ul>
        </div>

        <button type="submit">Guardar informações</button>
      </Form>
      <div className={styles.makeProtocol}>
        <button type="submit" onClick={handleCreateProtocol}>
          Gerar protocolo
        </button>
      </div>
    </div>
  );
}
