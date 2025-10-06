import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const exportChartToPDF = async (
  chartRef,
  filename = "chart.pdf",
  titleText = "graphic"
) => {
  if (!chartRef.current) return;

  const containerScroll = chartRef.current.querySelector(".overflow-x-auto");
  const contentWidth = containerScroll
    ? containerScroll.scrollWidth
    : chartRef.current.scrollWidth;

  // renderiza o conteúdo do gráfico inteiro como imagem
  const canvas = await html2canvas(chartRef.current, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    scrollX: 0,
    scrollY: 0,
    windowWidth: contentWidth + 20,
    windowHeight: chartRef.current.scrollHeight,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  // converte pixels para mm (aprox. 1px = 0.264583mm)
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const aspectRatio = canvas.height / canvas.width;
  let targetWidth = pdfWidth * 0.7;
  let targetHeight = targetWidth * aspectRatio;

  if (targetHeight > pdfHeight) {
    const scaleFactor = pdfHeight / targetHeight;
    targetWidth *= scaleFactor * 0.9;
    targetHeight = pdfHeight * 0.9;
  }

  //centraliza
  const x = (pdfWidth - targetWidth) / 2;
  const marginY = 20;
  const titleY = marginY;
  const borderY = titleY + 5;
  const imageY = borderY + 5;
  const borderHeight = targetHeight + 10;

  //Titulo
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(0, 0, 0);
  const titleX = pdfWidth / 2;
  pdf.text(titleText, titleX, 10, { align: "center" });

  //Borda
  pdf.setDrawColor(0, 0, 0);
  pdf.setLineWidth(0.5);
  pdf.rect(x - 5, borderY, targetWidth + 10, borderHeight);

  pdf.addImage(imgData, "PNG", x, imageY, targetWidth, targetHeight);
  pdf.save(filename);
};

export default exportChartToPDF;
