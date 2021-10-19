import Especificacao from "../../model/especificacaoModel";
import {
  IEspecificacaoRepositorio,
  ICreateEspecificacao,
} from "../IEspecificacaoRepositorio";

class EspecificacaoRepositorio implements IEspecificacaoRepositorio {
  private especicacoes: Especificacao[];

  private static INSTANCE: EspecificacaoRepositorio;

  private constructor() {
    this.especicacoes = [];
  }

  public static getEspecicacao(): EspecificacaoRepositorio {
    if (!EspecificacaoRepositorio.INSTANCE) {
      EspecificacaoRepositorio.INSTANCE = new EspecificacaoRepositorio();
    }
    return EspecificacaoRepositorio.INSTANCE;
  }

  findByName(nome: string): Especificacao {
    const especicacao = this.especicacoes.find((e) => e.nome === nome);
    return especicacao;
  }

  create({ nome, descricao }: ICreateEspecificacao): void {
    const especificacao = new Especificacao();
    Object.assign(especificacao, { nome, descricao, created_at: new Date() });
    this.especicacoes.push(especificacao);
  }
}

export default EspecificacaoRepositorio;
