import Image from "apps/website/components/Image.tsx";
import { SendEventOnView } from "../../components/Analytics.tsx";
import ProductHorizontal from "../../components/product/ProductHorizontal.tsx";
import Header from "../../components/ui/SectionHeader.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts"; 


export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    discount?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
    favoriteIcon?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  animateImage?: boolean;
  products: Product[] | null;
  title?: string;
  fontSize?: "Small" | "Normal" | "Large";
  description?: string;
  tamanhoDoContainer: "max-w-xl"
   | "max-w-2xl"
   | "max-w-3xl"
   | "max-w-4xl"
   | "max-w-5xl"
   | "max-w-6xl"
   | "max-w-7xl"
   | "max-w-full"; 
   layout?: Layout;
} 

export function LoadingFallback() {  
    return ( 
        <div>
            <div class="flex flex-col gap-2 text-center"><p class="text-xl font-semibold leading-8 lg:leading-10 text-base-content lg:text-3xl uppercase tracking-wide">loading...</p> </div>
            <div class="container flex bg-gray-200 p-4 my-8 rouded-lg"> 
                <div class="w-5/12 md:w-3/12 skeleton animate-pulse mb-4"></div>
                
                <div class="w-7/12 md:w-9/12 flex flex-col md:flex-row pl-4 md:pl-6 lg:gap-4">
                    <div class="w-full md:w-9/12 flex flex-col gap-0">
                        <div class="skeleton animate-pulse w-full h-12 mb-4"></div>
                        <div class="skeleton animate-pulse w-2/3 h-12 mb-4"></div>
                    </div>
                </div> 
            </div>
        </div>
    );
}


export function ErrorFallback({error} : {error?:Error}) {
    return (
        <div class={`container flex bg-gray-200 p-4 my-8 rouded-lg`}> 
            <div class="w-5/12 md:w-3/12"> 
                <Image
                    src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4700/9fc20fc1-6703-4aa6-88f6-7043bf5bd162"
                    alt="sss"
                    width={300}
                    height={290}
                    className="bg-base-100 col-span-full row-span-full rounded w-full"
                    sizes="(max-width: 640px) 50vw, 20vw" 
                    loading="lazy"
                    decoding="async"
                /> 
            </div>
            
            <div class="w-7/12 md:w-9/12 flex flex-col md:flex-row pl-4 md:pl-6 lg:gap-4">
                <div class="w-full md:w-9/12 flex flex-col gap-0">
                    <h2 class="text-left text-lg lg:text-2xl mb-4 font-semibold">Carnaval brasileiro</h2>
                    <div class="truncate lg:text-base text-base text-left">O Carnaval brasileiro é uma das maiores festas do mundo e atrai milhões de turistas nacionais e estrangeiros a cada ano, tornando-se uma parte fundamental da cultura e identidade nacional do Brasil.</div>
                    <a href="/culturas"><button class="btn bg-primary w-auto mt-4 text-white">Saiba mais</button></a>
                    
                </div>
            </div> 
        </div> 
    );
}
   

function HorizontalProductCard({
  products,
  animateImage,
  title,
  fontSize,
  description,
  tamanhoDoContainer, 
  layout,
}: Props) {
  const id = useId();
  const l = layout;
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  } 

  return (
    <div className="w-full container py-8 flex justify-center flex-col gap-6 lg:py-10"> 
      <Header
        title={title || ""}
        description={description || ""}
        fontSize={fontSize || "Normal"}
        alignment="center"
      />

      <div id={id} className={`grid px-0 container md:${tamanhoDoContainer}`}>
        {products?.map((product, index) => (
          <ProductHorizontal
            tamanhoDoContainer={tamanhoDoContainer}
            animateImage={animateImage}
            key={index}
            product={product}
            itemListName={title}
            platform={platform} 
            index={index}
          />
        ))}

        <SendEventOnView
          id={id}
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product, index) =>
                mapProductToAnalyticsItem({
                  index,
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
      </div>
      <div class="hidden md:max-w-xl md:max-w-2xl md:max-w-3xl md:max-w-4xl md:max-w-5xl md:max-w-6xl md:max-w-7xl md:max-w-full"></div>
    </div>
  );
}

export default HorizontalProductCard;