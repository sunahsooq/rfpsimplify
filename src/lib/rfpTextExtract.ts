import mammoth from "mammoth";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

// Vite-friendly worker wiring for pdfjs
GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export async function extractRfpTextFromFile(file: File): Promise<string> {
  const name = file.name.toLowerCase();

  if (name.endsWith(".txt")) {
    return await file.text();
  }

  const buf = await file.arrayBuffer();

  if (name.endsWith(".docx")) {
    const res = await mammoth.extractRawText({ arrayBuffer: buf });
    return (res.value ?? "").trim();
  }

  if (name.endsWith(".pdf")) {
    const pdf = await getDocument({ data: buf }).promise;
    let out = "";
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const strings = content.items
        .map((it: any) => (typeof it?.str === "string" ? it.str : ""))
        .filter(Boolean);
      out += strings.join(" ") + "\n";
    }
    return out.trim();
  }

  throw new Error("Unsupported file type. Please upload a PDF, DOCX, or TXT.");
}
