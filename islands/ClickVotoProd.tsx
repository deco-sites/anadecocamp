import { useState } from 'preact/hooks';
import { useSignal } from "@preact/signals"; 
import Icon from "../components/ui/Icon.tsx";
import { invoke } from "deco-sites/anadecocamp/runtime.ts";

export default function CounterClick(productid){
    const count = useSignal(0); 
    const [icone, setIcon] = useState("Mood");
    const [color, setColor] = useState("text-gray-400");  
    const increment = async () => { 
        try {
            const response = await invoke["deco-sites/anadecocamp"].actions.AddVoto({productId: productid});

            console.log("response-------------------------------");
            console.log(response);
            
            count.value++;
            
            if (color === "text-gray-400") {
                setColor(color === "text-gray-400" ? "text-base" : "text-base");
            }
            if (icone === "Mood") {
                setIcon(icone === "Mood" ? "MoodCheck" : "Mood");
            }  
        } catch (error) { 
            console.error("Error");
        }
    }; 

    return (
        <div> 
            <button class={`flex items-center ${color}`} id="btnMood" onClick={increment}>
                <Icon id={icone} size={24} />
                <span class="ml-1 text-sm">({count.value})</span>
            </button> 
        </div>
    );
}
