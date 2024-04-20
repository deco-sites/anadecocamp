import { useState } from 'preact/hooks';
import { useSignal } from "@preact/signals"; 
import Icon from "../components/ui/Icon.tsx";
import { invoke } from "deco-sites/anadecocamp/runtime.ts";  
import { useEffect } from "preact/compat";
import { getProdVotos } from "deco-sites/anadecocamp/sdk/VotosPorProduto.ts";

export interface VotosPorProduto {
    productId: string;
}

  
const REFRESH_TIMEOUT = 30 * 1000; // 30 segundos

export default function TrazerVotosProdu(productid){  
    const votosprod = useSignal<VotosPorProduto | null>(null);  
    const fetchVotos = async () => {
        if (!productid) return;

        const resultado = await getProdVotos({
            productId: productid,
        }); 
        if (resultado === null) {
        return;
        } 
        votosprod.value = resultado;
        setTimeout(fetchVotos, REFRESH_TIMEOUT);
    };
    useEffect(() => {
        fetchVotos();
    }, [productid]); 
    return (
        <div> 
            <button> 
                <span class="ml-1 text-sm">VOTOS: ({votosprod.value})</span>
            </button> 
        </div>
    );
}
