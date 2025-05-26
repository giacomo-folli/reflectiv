import fs from "fs";
import Parser from "./Parser";

export class Generator {
  static async generate_template(
    templatePath: string,
    mantra: string,
    theme: string,
    free: string,
    prompt: string,
    num: string,
    output_path: string
  ): Promise<void> {
    const parser = new Parser({
      templatePath,
      mantra,
      theme,
      free,
      prompt,
      num,
    });
    const parsed_content = await parser.parse();

    fs.writeFileSync(output_path, parsed_content, { flag: "w+" });
  }

  static generate_pdf(template_path: string) {
    const options = {
      pageSize: "A4",
      pageMargins: [0, 0, 0, 0],
      content: "This is a basic PDF generated with pdfMake", // Replace with actual content
    };

    const pdfDir = "output";
    const templateName = template_path.split("/")[1].split(".")[0];
    const outputPath = `${pdfDir}/${templateName}.pdf`;

    try {
      // Ensure the output directory exists
      if (!fs.existsSync(pdfDir)) {
        fs.mkdirSync(pdfDir, { recursive: true });
      }

      // Actual pdf implementation
    } catch (e: any) {
      console.error(`Error generating PDF: ${e}`);
      throw e;
    }
  }
}
