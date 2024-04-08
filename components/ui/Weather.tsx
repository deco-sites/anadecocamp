import { Temperature } from "apps/weather/loaders/temperature.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
 
export type Temperatura = {
    temperatura: Temperature | null; 
    local: string;
    imagem: ImageWidget;
};

export interface Props {
    titulo: string;
    temperaturas: Temperatura[]; 
}

export default function Weather({ titulo, temperaturas }: Props) { 
    return (
        <div className="container px-4 py-8"> 
            <h2 className="text-center text-xl md:text-2xl font-medium mb-4">{titulo}</h2>
            <div class="grid grid-cols-2 md:flex justify-center">
                {temperaturas.map((item, index) => ( 
                    <div key={index} className="mx-4"> 
                        <Image 
                            src={item.imagem}
                            alt={item.local}
                            width={160}
                            height={105} 
                            loading="lazy"
                        /> 
                        <p className="text-center text-lg font-medium py-1">{item.local}</p>
                        {item.temperatura && <p className="text-center text-lg font-medium">{item.temperatura.celsius} º</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}