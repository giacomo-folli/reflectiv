import fs from "fs";

export default class Parser {
  static readonly mantra_templ_str = "%mantra%";
  static readonly prompt_templ_str = "%prompt%";
  static readonly theme_templ_str = "%theme%";
  static readonly free_templ_str = "%free%";
  static readonly num_templ_str = "%num%";

  private content: string;
  private mantra: string;
  private prompt: string;
  private theme: string;
  private free: string;
  private num: string;

  constructor(
    template_path: string,
    mantra: string,
    prompt: string,
    theme: string,
    free: string,
    num: string
  ) {
    // TODO: Handle file reading in a more robust way (e.g., using fs.promises)
    this.content = fs.readFileSync(template_path, "utf-8");

    this.mantra = mantra;
    this.prompt = prompt;
    this.theme = theme;
    this.free = free;
    this.num = num;
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

  parse(): string {
    this.setMantra(this.mantra);
    this.setPrompt(this.prompt);
    this.setTheme(this.theme);
    this.setFree(this.free);
    this.setNum(this.num);
    return this.content;
  }
}
