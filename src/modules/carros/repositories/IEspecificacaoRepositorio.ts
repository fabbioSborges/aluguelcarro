import Especificacao from "../model/especificacaoModel";

interface ICreateEspecificacao {
  nome: string;
  descricao: string;
}

interface IEspecificacaoRepositorio {
  findByName(nome: string): Especificacao;
  create({ nome, descricao }: ICreateEspecificacao): void;
}

export { IEspecificacaoRepositorio, ICreateEspecificacao };
