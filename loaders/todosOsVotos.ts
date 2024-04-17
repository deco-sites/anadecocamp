export interface TodosOsVotos {
    total: number;
}

const loader =  async (_props: Props, _req: Request, _ctx: AppContext): Promise<TodosOsVotos> => { 
    const headers = {
        'x-api-key': "anadecocamp",
        'Content-Type': 'application/json'
    };
    const response = await fetch('https://camp-api.deco.cx/events', {
        method: 'GET',
        headers: headers
      });

    const votos = await response.json() as TodosOsVotos; 

    return votos.total;
}

export default loader;