import { Temperature } from "apps/weather/loaders/temperature.ts"; 
  
export interface Props {  
    temperatura: Temperature | null; 
    local: string; 
}

export default function Weather({ local, temperatura }: Props) { 
    return ( 
        <p className="fixed text-center bg-primary rounded-full bottom-5 left-5 text-white font-medium text-2xl flex justify-center flex-wrap items-center content-center z-10 p-2 w-24 h-24">{temperatura?.celsius}º <span class="text-xs font-light w-full">em {local}</span></p>  
    );
}