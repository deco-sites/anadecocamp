import { useEffect, useState } from "preact/hooks";
import { invoke } from "deco-sites/anadecocamp/runtime.ts";
 
 
const REFRESH_TIMEOUT = 20 * 1000; // 20 segundos
export default function TrazerTotalVotosDois() {
    const [total, setTotal] = useState<number>(0); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await invoke["deco-sites/anadecocamp"].loaders.todosOsVotos();
                setTotal(data.total); 
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
            setTimeout(fetchData, REFRESH_TIMEOUT);
        };
        fetchData();
    }, []);

    return ( 
        <span class="text-sm">({total})</span> 
    );
}
