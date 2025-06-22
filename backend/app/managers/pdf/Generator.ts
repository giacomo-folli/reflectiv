import fs from "fs";
import puppeteer from "puppeteer";
import ParserManager from "./Parser.js";

export interface TemplateProps {
  templatePath: string;
  mantra: string;
  theme: string;
  free: string;
  prompt: string;
  num: string;
  outputPath: string;
}

export class Generator {
  static async generateTemplate(params: TemplateProps): Promise<void> {
    const parser = new ParserManager({
      templatePath: params.templatePath,
      mantra: params.mantra,
      theme: params.theme,
      free: params.free,
      prompt: params.prompt,
      num: params.num,
    });
    const parsed_content = await parser.parse();

    fs.writeFileSync(params.outputPath, parsed_content, { flag: "w+" });
  }

  static async generate_pdf(templatePath: string) {
    const pdfDir = "output";
    const templateName = templatePath.split("/")[1].split(".")[0];
    const outputPath = `output/${templateName}.pdf`;

    // Ensure the output directory exists
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }

    try {
      // Actual pdf generation
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`file://${templatePath}`, { waitUntil: "networkidle0" });
      await page.pdf({ path: outputPath, format: "A4" });
      await browser.close();
    } catch (e: any) {
      console.error(`Error generating PDF: ${e}`);
      throw e;
    }
  }
} 