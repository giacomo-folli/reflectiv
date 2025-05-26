import fs from "fs/promises";
import path from "path";

export default class Parser {
  static readonly mantra_templ_str = "%mantra%";
  static readonly prompt_templ_str = "%prompt%";
  static readonly theme_templ_str = "%theme%";
  static readonly free_templ_str = "%free%";
  static readonly num_templ_str = "%num%";

  private content: string = "";
  private mantra: string;
  private prompt: string;
  private theme: string;
  private free: string;
  private num: string;

  private constructor(params: {
    templatePath: string;
    mantra: string;
    prompt: string;
    theme: string;
    free: string;
    num: string;
  }) {
    this.mantra = params.mantra;
    this.prompt = params.prompt;
    this.theme = params.theme;
    this.free = params.free;
    this.num = params.num;

    fs.readFile(path.resolve(params.templatePath), "utf-8")
      .then((res) => (this.content = res))
      .catch((err) => {
        throw new Error("Failed to read file: " + err.message);
      });
  }

  setMantra(mantra: string): void {
    this.content = this.content.replace(Parser.mantra_templ_str, mantra);
  }

  setFree(free: string): void {
    this.content = this.content.replace(Parser.free_templ_str, free);
  }

  setPrompt(prompt: string): void {
    this.content = this.content.replace(Parser.prompt_templ_str, prompt);
  }

  setTheme(theme: string): void {
    this.content = this.content.replace(Parser.theme_templ_str, theme);
  }

  setNum(num: string): void {
    this.content = this.content.replace(Parser.num_templ_str, num);
  }

  async parse(): Promise<string> {
    this.setMantra(this.mantra);
    this.setPrompt(this.prompt);
    this.setTheme(this.theme);
    this.setFree(this.free);
    this.setNum(this.num);
    return this.content;
  }
}
