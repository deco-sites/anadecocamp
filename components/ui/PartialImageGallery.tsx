import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

export type imageGallery = {
  label: string;
  imagem: ImageWidget;
  alt: string;
};  

export interface Props {
  titulo: string;
  /** @minItems 3 */
  imagens: imageGallery[]; 
}

export default function TopoPadraoPaginas(
  { titulo, imagens }: Props,
) {  
  const current = 0;
  const limite = 3;
  const total = imagens.length;
  const primeirasImagens = imagens.slice(current, limite);
  return (
    <div
      class="container py-8">  
        <h2 class="text-2xl font-light leading-8 lg:leading-10 text-base-content lg:text-4xl text-center mb-4">{titulo}</h2>
        <div class="flex flex-wrap max-w-[960px] mx-auto">
          {primeirasImagens.map((item, index) => (
            <div key={index} class="px-2 pb-4">
              <figure>
                <Image 
                  src={item.imagem}
                  alt={item.alt} 
                  width={300}
                  height={320}
                  loading="lazy"
                />
              </figure>
            </div>
          ))}  
          <div class="w-full">
            <button class="btn mt-4 py-1 px-8 block bg-primary w-auto mx-auto text-white border-0 h-auto min-h-0 md:text-sm" {...usePartialSection({ props: {imagens: imagens},mode: "append" })}>Ver Mais</button>
          </div>
        </div>
    </div>
  );
}
