import * as Yup from "yup";

export const itemSchema = Yup.object().shape({
  qtd: Yup.string().required({
    msg: "O campo quantidade não pode ficar vazio",
  }),
  material: Yup.string().required({
    msg: "O campo material não pode ficar vazio",
  }),
  configuracao: Yup.string().required({
    msg: "O campo configuração não pode ficar vazio",
  }),
  motivo: Yup.string().required({
    msg: "O campo motivo não pode ficar vazio",
  }),
  patrimonio: Yup.string().required({
    msg: "O campo patrimônio não pode ficar vazio",
  }),
});

export const infoSchema = Yup.object().shape({
  sedeRemetente: Yup.string().required({
    msg: "O campo Sede remetente não pode ficar vazio",
  }),
  sedeDestino: Yup.string().required({
    msg: "O campo Sede Destino não pode ficar vazio",
  }),
  tiRemetente: Yup.string().required({
    msg: "O campo Ti remetente não pode ficar vazio",
  }),
  tiDestinatario: Yup.string().required({
    msg: "O campo Ti destinatário não pode ficar vazio",
  }),
  tecRemetente: Yup.string().required({
    msg: "O campo Remetente não pode ficar vazio",
  }),
  tecDestinatario: Yup.string().required({
    msg: "O campo Destinatário não pode ficar vazio",
  }),
});
