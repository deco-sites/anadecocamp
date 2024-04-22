export interface TodosOsVotos {
    total: number;
}

const loader = async (): Promise<TodosOsVotos> => { 
    const headers = {
        'x-api-key': "anadecocamp",
        'Content-Type': 'application/json'
    };
    const response = await fetch('https://camp-api.deco.cx/events', {
        method: 'GET',
        headers: headers
    });

    const votos = await response.json(); 
    
    return { total: votos.total };
}

export default loader;