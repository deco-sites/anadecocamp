export interface Props {
  product: number;
  productId: string;
}

const loader =  async (props: Props, _req: Request, _ctx: unknown): Promise<VotosPorProduto> => {  
  const response = await fetch(`https://camp-api.deco.cx/event/${props.productId.productid}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': "anadecocamp"
    } 
  }); 
  const votos = await response.json() as Props;  
  return votos.product; 
}

export default loader;