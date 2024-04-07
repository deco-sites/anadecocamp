import { SendEventOnView } from "../../components/Analytics.tsx";
import ProductHorizontal from "../../components/product/ProductHorizontal.tsx";
import Header from "../../components/ui/SectionHeader.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts"; 
  

interface Props {
  products: Product[] | null;
  title?: string;
  description?: string;
  tamanhoDoContainer: "max-w-xl"
   | "max-w-2xl"
   | "max-w-3xl"
   | "max-w-4xl"
   | "max-w-5xl"
   | "max-w-6xl"
   | "max-w-7xl"
   | "max-w-full"; 
}
 
function HorizontalProductCard({
  products,
  title,
  description,
  tamanhoDoContainer, 
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  } 

  return (
    <div className="w-full container py-8 flex flex-col gap-6 lg:py-10">
      <Header
        title={title || ""}
        description={description || ""}
        fontSize="Large"
        alignment="center"
      />

      <div id={id} className={`grid px-0 container md:${tamanhoDoContainer}`}>
        {products?.map((product, index) => (
          <ProductHorizontal
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
    </div>
  );
}

export default HorizontalProductCard;