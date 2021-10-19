import {
  IEspecificacaoRepositorio,
  ICreateEspecificacao,
} from "../../repositories/IEspecificacaoRepositorio";

class CreateEspecificacaoUseCase {
  private especificacaoRepositorio: IEspecificacaoRepositorio;

  constructor(especificacaoRepositorio: IEspecificacaoRepositorio) {
    this.especificacaoRepositorio = especificacaoRepositorio;
  }

  execute({ nome, descricao }: ICreateEspecificacao) {
    const especificaoExiste = this.especificacaoRepositorio.findByName(nome);
    if (especificaoExiste) {
      throw new Error("Especificacao Já adicionada no banco de dados");
    }
    console.log(this.especificacaoRepositorio);
    this.especificacaoRepositorio.create({ nome, descricao });
  }
}

export default CreateEspecificacaoUseCase;
