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
  sedeRemetente: Yup.string().required(),
  sedeDestino: Yup.string().required(),
  tiRemetente: Yup.string().required(),
  tiDestinatario: Yup.string().required(),
  tecRemetente: Yup.string().required(),
  tecDestinatario: Yup.string().required(),
});
