import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  Imagem: {
    Desktop: ImageWidget;
    Mobile: ImageWidget;
    Alt?: string;
  }; 
  Fullbanner?: boolean;
  action?: {
    href?: string;
    title?: string;
  };
  margem?: {
    tamanhoDoEspacamento?: "Margem grande" | "Margem pequena";
  };
}

export default function FullBanner(
  { Imagem, action, margem, Fullbanner }: Props,
) {
  return (
    <div
      class={`${Fullbanner == true ? "row" : "container px-4 md:px-0"}  
      ${margem?.tamanhoDoEspacamento == "Margem pequena" ? "my-4" : ""}
      ${
        margem?.tamanhoDoEspacamento == "Margem grande"
          ? "my-20 px-4 lg:px-0"
          : ""
      }
      `}
    >
      <a
        href={action?.href ?? "#"}
        title={action?.title}
        class="relative h-[600px] overflow-y-hidden w-full"
      >
        <Picture>
          <Source
            media="(max-width: 768px)"
            src={Imagem.Mobile}
            width={360}
          />
          <Source
            media="(min-width: 768px)"
            src={Imagem.Desktop}
            width={1200}
          />
          <img
            src={Imagem.Desktop}
            alt={Imagem.Alt}
            class="w-full md:w-auto h-auto mx-auto"
            width={1200}
            decoding="async"
            loading="lazy"
          />
        </Picture>
      </a>
    </div>
  );
}
