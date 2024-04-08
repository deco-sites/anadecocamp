export interface Props {
  productId: number; 
}

export default async function AddVoto(props: Props, _req: Request, _ctx: unknown): Promise<Result> { 
    const url = 'https://camp-api.deco.cx/event';
    const headers = {
      'x-api-key': "anadecocamp",
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
        productId: props.productId
    });

    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: body
        });
    
        if (response.ok) {
          const data = await response.json();
          return data; 
        } else {
          throw new Error('Erro ao registrar voto');
        }
    } catch (error) {
        console.log("error-------------------------------");
        console.log(error);
        console.error('Erro:', error.message);
        return null;
    } 
}