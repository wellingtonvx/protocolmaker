const headers = ["Qtd", "Material", "Configuracão", "Motivo", "Patrimonio"];

export function handleCreateProtocol({ dados }) {
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
