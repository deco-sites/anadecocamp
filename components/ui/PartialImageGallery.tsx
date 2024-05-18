
import Image from "apps/website/components/Image.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { ImageWidget } from "apps/admin/widgets.ts"; 

export type imageGallery = {
  label: string;
  imagem: ImageWidget;
  alt: string;
};  

export interface Props {
  titulo: string;
  /** @minItems 3 */
  imagens: imageGallery[]; 
  limite: number;
}

export default function Section({ titulo,imagens, limite }: Props) {
  return (
    <div class="container py-8">  
      <h2 class="text-xl font-semibold leading-8 lg:leading-10 text-base-content uppercase tracking-wide text-center lg:text-3xl mb-4">{titulo}</h2>
      <div class="flex flex-wrap max-w-[960px] mx-auto galeria-imagens">
        {imagens.map((image) => (
          <div 
            class="px-2 pb-4 w-full flex justify-center md:w-auto">
            <figure 
              class="overflow-hidden"
              width={300}
              height={320}
            >
              <Image 
                src={image.imagem}
                alt={image.alt} 
                width={300}
                height={320}
                loading="lazy"
                class="hover:scale-110 transition-all"
              />
            </figure>
          </div>
        )).slice(0, limite)}
        <div class="w-full">
          <button
          data-um={imagens.length} data-dois={limite}
            class={imagens.length <= limite ? "hidden" : "btn mt-4 py-1 px-8 block bg-primary hover:bg-primary hover:opacity-90 w-auto mx-auto text-white border-0 h-auto min-h-0 md:text-sm"}
            {...usePartialSection({props: { imagens, limite: limite + 1 }, mode: "replace"})}
          >
            Ver Mais
          </button>
        </div>
      </div>
    </div>
  );
}