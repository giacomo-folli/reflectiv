import fs from "fs";
import Parser from "./Parser";
import puppeteer, { Browser } from "puppeteer";

let browserInstance: Browser | null = null;

async function getBrowserInstance(): Promise<Browser> {
  if (!browserInstance || !browserInstance.isConnected()) {
    try {
      console.log("Launching new browser instance...");
      browserInstance = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      browserInstance.on('disconnected', () => {
        console.log('Browser instance disconnected.');
        browserInstance = null;
      });
    } catch (error) {
      console.error("Failed to launch browser:", error);
      throw error; // Rethrow or handle more gracefully
    }
  }
  if (!browserInstance) {
    // This should ideally not happen if launch is successful
    throw new Error("Failed to get browser instance after attempting to launch.");
  }
  return browserInstance;
}

export async function cleanupBrowser(): Promise<void> {
  if (browserInstance && browserInstance.isConnected()) {
    console.log("Closing browser instance...");
    await browserInstance.close();
    browserInstance = null;
  }
}

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
    const parser = new Parser({
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
      const browserAcquisitionStartTime = Date.now();
      const browser = await getBrowserInstance();
      console.log(`Browser instance acquired in: ${Date.now() - browserAcquisitionStartTime}ms`);

      if (!browser) {
        throw new Error("Failed to get browser instance for PDF generation.");
      }

      const totalPdfGenerationStartTime = Date.now();
      const page = await browser.newPage();
      try {
        const gotoStartTime = Date.now();
        await page.goto(`file://${templatePath}`, { waitUntil: "load" });
        console.log(`page.goto() took: ${Date.now() - gotoStartTime}ms`);

        const pdfRenderStartTime = Date.now();
        await page.pdf({ path: outputPath, format: "A4" });
        console.log(`page.pdf() took: ${Date.now() - pdfRenderStartTime}ms`);
      } finally {
        await page.close();
        console.log(`Total PDF processing (newPage, goto, pdf, close) took: ${Date.now() - totalPdfGenerationStartTime}ms`);
      }
    } catch (e: any) {
      console.error(`Error generating PDF: ${e}`);
      throw e;
    }
  }

  static isBrowserHealthy(): boolean {
    return browserInstance !== null && browserInstance.isConnected();
  }
}
