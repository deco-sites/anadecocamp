
import { TodosOsVotos } from "deco-sites/anadecocamp/loaders/todosOsVotos.ts";

export interface Props { 
  totalDeVotos: TodosOsVotos;
}

function trazerTotalDeVotos({ totalDeVotos }: Props) {
  return totalDeVotos
}

export default trazerTotalDeVotos;
