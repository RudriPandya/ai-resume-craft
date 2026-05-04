// @ts-ignore - no types for html2pdf.js
import html2pdf from "html2pdf.js";

export async function exportResumeToPDF(elementId: string, fileName: string) {
  const el = document.getElementById(elementId);
  if (!el) throw new Error("Resume element not found");

  const opt = {
    margin: 0,
    filename: fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"] },
  };

  return html2pdf().set(opt).from(el).save();
}
