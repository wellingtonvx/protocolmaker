import { useState } from "react";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Image from "next/image";

import { CreateProtocol } from "../components/JsPDF";

import Input from "../components/Form/Input";
import Select from "../components/Form/Select";
import { Sedes, Ti } from "../utils/data";

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

  console.log(items);

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
    <div className="container m-auto mt-6 bg-gray-300 border-2 2xl">
      <div className="absolute left-16 top-10">
        <Image src="/images/logo.png" width={120} height={60} alt="logo" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="m-3 text-4xl ">Protocolo Antares</h1>
        <h3 className="m-3 text-xl">
          Protocolo de movimentação de equipamentos de TI
        </h3>
      </div>
      <div className="px-20 mt-8">
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

      {/**Adicionando um item da lista */}

      <Form
        onSubmit={handleAddData}
        className="flex items-center justify-between px-20 pt-5 pb-1"
      >
        <table className="table-auto ">
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
                <Input
                  name="qtd"
                  type="number"
                  className="w-16 text-center border"
                />
              </td>
              <td>
                <Input
                  name="material"
                  type="text"
                  className="text-center border w-72"
                />
              </td>
              <td>
                <Input
                  name="configuracao"
                  type="text"
                  className="text-center border w-72"
                />
              </td>
              <td>
                <Input
                  name="motivo"
                  type="text"
                  className="text-center border w-60"
                />
              </td>
              <td>
                <Input
                  name="patrimonio"
                  type="number"
                  className="w-24 text-center border"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button
          className="px-2 py-1 mt-5 border rounded-md bg-red-50"
          type="submit"
        >
          Adicionar
        </button>
      </Form>
      <h2 className="p-3 text-xl text-center">Items Adicionados</h2>
      <div className="flex items-center justify-between px-20 pt-1">
        <table className="table-auto ">
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="flex items-center justify-between ">
                <td
                  style={{ marginRight: "2px" }}
                  className="w-16 text-center bg-yellow-100 border"
                >
                  {item.qtd}
                </td>
                <td
                  style={{ marginRight: "2px" }}
                  className="text-center bg-yellow-100 border w-72"
                >
                  {item.material}
                </td>
                <td
                  style={{ marginRight: "2px" }}
                  className="text-center bg-yellow-100 border w-72"
                >
                  {item.configuracao}
                </td>
                <td
                  style={{ marginRight: "2px" }}
                  className="text-center bg-yellow-100 border w-60"
                >
                  {item.motivo}
                </td>
                <td
                  style={{ marginRight: "2px" }}
                  className="w-24 text-center bg-yellow-100 border"
                >
                  {item.patrimonio}
                </td>
                <td>
                  <button
                    className="w-8 text-white bg-red-600 border rounded-md color"
                    onClick={handleDeleteItem}
                  >
                    X
                  </button>
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

      <button onClick={handleCreateProtocol}>Gerar protocolo</button>
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
