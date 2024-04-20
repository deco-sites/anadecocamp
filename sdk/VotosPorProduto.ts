import { invoke } from "deco-sites/anadecocamp/runtime.ts";

// Define um tipo para os parâmetros do produto
interface ProductParams {
  productId: string;
}

// Define a função getProdVotos
export const getProdVotos = ({ productId }: ProductParams) =>
  invoke["deco-sites/anadecocamp"].loaders.VotosPorProduto({ productId } as Props);
