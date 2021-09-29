import { jsPDF } from "jspdf";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";

import "jspdf-autotable";

export const headers = [
  "Qtd",
  "Material",
  "Configuracão",
  "Motivo",
  "Patrimonio",
];

export const HeadStyles = {
  halign: "center",
  fontSize: 12,
  lineColor: "#000",
  lineWidth: 0.3,
  fillColor: false,
  textColor: "#000",
};

export const BodyStyles = {
  textColor: "#000000",
  cellPadding: 1,
  halign: "center",
  valign: "middle",
};

export const textHeader = [
  "PROTOCOLO DE MOVIMENTAÇÃO DE EQUIPAMENTOS DE TI",
  195,
  20,
  "right",
];

export function CreateProtocol(items, infos, protocolNumber, yearProtocol) {
  const doc = jsPDF();
  const date = format(new Date(), "dd MMMM yyyy", { locale: pt });

  console.log(infos);

  const data = items.map((item) => Object.values(item));
  const heightText = data.length <= 5 ? 6 : data.length;
  doc.addImage("/images/logo.png", "png", 10, 10, 30, 15);
  /*------------------*/
  doc.autoTable(headers, data, {
    margin: { top: 40 },
    headStyles: HeadStyles,
    bodyStyles: BodyStyles,
  });
  doc.setFontSize(10);
  doc.text("PROTOCOLO DE MOVIMENTAÇÃO DE EQUIPAMENTOS DE TI", 195, 20, "right");
  doc.text(
    `Protocolo Nº: ${protocolNumber} / ${yearProtocol}`,
    195,
    30,
    "right"
  );

  /*------------------*/
  doc.text("SEDE REMETENTE: ", 10, heightText * 20, "left");
  doc.text(infos.sedeRemetente, 45, heightText * 20, "left");
  doc.text("SEDE DESTINO: ", 10, heightText * 21, "left");
  doc.text(infos.sedeDestino, 40, heightText * 21, "left");

  /*------------------*/
  doc.rect(10, heightText * 22, 190, 22);
  doc.text(
    "Obs.: Protocolo impresso em 3 vias. Uma é assinada pelo motorista no ata da entrega do material ao motorista e a mesma fica com o remetente. As duas restantes são assinadas pelo destinatário recebendo e conferindo o mateiral. Uma fica com o destinatário e a outra fica com o motorista. Os protocolos envidados são OBRIGATORIAMENTE conferidos e assinados pelo responsável da TI",
    12,
    heightText * 23,
    {
      maxWidth: 184,
      align: "justify",
    }
  );

  /*------------------*/
  doc.text(`Fortaleza, ${date}`, 10, heightText * 28, "left");
  doc.setLineWidth(0.5);
  doc.line(10, heightText * 32, 70, heightText * 32);

  doc.save(`Protocolo.pdf`);
}
