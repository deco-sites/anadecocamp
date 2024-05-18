import { useState } from 'preact/hooks';
import { useSignal } from "@preact/signals"; 
import { useEffect } from "preact/compat";
import Icon from "../components/ui/Icon.tsx";
import { invoke } from "deco-sites/anadecocamp/runtime.ts";
import { getProdVotos } from "deco-sites/anadecocamp/sdk/VotosPorProduto.ts";
import { SendEventOnView } from "deco-sites/anadecocamp/components/Analytics.tsx";
import Toastify from 'https://esm.sh/toastify-js';

const REFRESH_TIMEOUT = 30 * 1000; // 30 segundos

export default function CounterClick(productid){
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
        count.value = resultado; 
        setTimeout(fetchVotos, REFRESH_TIMEOUT);
    };

    useEffect(() => {
        fetchVotos(); 
    }, [productid]);

    const count = useSignal(0); 
    const [icone, setIcon] = useState("Mood");
    const [color, setColor] = useState("text-gray-400");  

    const increment = async () => { 
        Toastify({
            text: "Seu voto foi efetuado com sucesso!",
            duration: 6000,  
            close: true,
            gravity: "bottom", 
            position: "left",
            stopOnFocus: true, 
        }).showToast();
        try { 
            const response = await invoke["deco-sites/anadecocamp"].actions.AddVoto({productId: productid.productid});  
            if(response === "ok"){
                count.value++; 
                if (color === "text-gray-400") {
                    setColor("text-base");
                }
                if (icone === "Mood" || count.value > 0) {
                    setIcon("MoodCheck");
                } 
                 
                const produtoClicado = localStorage.getItem(`produto_clicado`);
                if (!produtoClicado) { 
                    localStorage.setItem(`produto_clicado`, productid.productid);
                } else { 
                    if (!produtoClicado.includes(productid.productid)) { 
                        localStorage.setItem(`produto_clicado`, `${produtoClicado},${productid.productid}`);
                    }
                }
            }
            
        } catch (error) { 
            console.error("Error");
        }
    }; 

    return (
        <div> 
            <button class={`flex items-center ${color}`} id="btnMood" onClick={increment}>
                <Icon id={icone} size={24} /> 
                <span class="ml-1 text-sm">({count})</span>
            </button> 
            <SendEventOnView
                id="vote-counter"
                event={{
                    name: "post_score",
                    params: {
                        score: count.value,
                    },
                }}
            />
        </div>
    );
}
