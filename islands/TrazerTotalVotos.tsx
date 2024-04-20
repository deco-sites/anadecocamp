import { SectionProps } from "deco/mod.ts";

export interface TodosOsVotosIn {
    total: number;
}

export const loader = async (_props: Props, _req: Request, _ctx: unknown): Promise<TodosOsVotosIn> => {  
    const response = await fetch('https://camp-api.deco.cx/events', {
        method: 'GET',
        headers: {
            'x-api-key': "anadecocamp",
            'Content-Type': 'application/json'
        }
      });

    const total = await response.json() as TodosOsVotosIn; 
    console.log('total'); 
    console.log(total); 

    return total; 
} 

export default function TrazerTotalVotos({ total }: SectionProps<typeof loader>){
    console.log('total______________________');
    console.log(total); 
    return ( 
        <span class="text-sm">(total)</span>
    );
}
