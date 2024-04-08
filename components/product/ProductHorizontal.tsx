import { SendEventOnClick } from "../../components/Analytics.tsx";
import Avatar from "../../components/ui/Avatar.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
import WishlistButtonWake from "../../islands/WishlistButton/vtex.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { relative } from "../../sdk/url.ts";
import CounterClick from "../../islands/ClickVotoProd.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  platform?: Platform;
}

const WIDTH = 390;
const HEIGHT = 305;


function ProductHorizontal({
  product,
  preload,
  itemListName,
  platform,
  index,
}: Props) {
  const { url, productID, name, image: images, offers, isVariantOf } = product;
  const id = `product-card-${productID}`;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const productGroupID = isVariantOf?.productGroupID;
  const description = product.description || isVariantOf?.description;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});

  const relativeUrl = relative(url);
  const skuSelector = variants.map(([value, link]) => {
  const relativeLink = relative(link);
    return (
      <li>
        <a href={relativeLink}>
          <Avatar
            variant={relativeLink === relativeUrl
              ? "active"
              : relativeLink
              ? "default"
              : "disabled"}
            content={value}
          />
        </a>
      </li>
    );
  });
  const cta = (
    <a
      href={url && relative(url)}
      aria-label="view product"
      class="btn p-1 btn-block bg-success text-white border-0 h-auto min-h-0 text-xs md:text-sm"
    >
      adicionar ao carrinho
    </a>
  );

  return (
    <div
      id={id}
      data-product-id={productID}
      class="flex flex-row card card-compact group text-center p-4 bg-gray-200"
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />
      <figure class="w-6/12 md:w-3/12 relative overflow-hidden">
        {/* Wishlist button */}
        <div class="absolute top-2 z-10 flex items-center right-2">
          {platform === "vtex" && (
            <WishlistButtonVtex
              productGroupID={productGroupID}
              productID={productID}
            />
          )} 
        </div>
        {/* Product Images */}
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="grid grid-cols-1 grid-rows-1 w-full"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={300}
            height={290}
            class="bg-base-100 col-span-full row-span-full rounded w-full"
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          /> 
        </a>
      </figure>
      {/* Prices & Name */}
      <div class="w-6/12 md:w-9/12 md:pt-2 flex flex-col md:flex-row pl-2 md:px-6 lg:gap-4"> 
        <div class="w-full md:w-9/12 flex flex-col gap-0 relative">
          <h2
            class="text-left text-base leading-5 lg:text-2xl mb-2 font-semibold text-ellipsis overflow-hidden"
            dangerouslySetInnerHTML={{ __html: name ?? "" }}
          />
          <div
            class="lg:text-lg text-xs text-left text-ellipsis overflow-hidden max-h-8 md:max-h-20 mb-2"
            dangerouslySetInnerHTML={{ __html: description ?? "" }}
          /> 
          <div class="absolute bottom-1">
            <CounterClick productid={productID}/>
          </div>
          
        </div>
        <div class="w-full md:justify-between md:w-3/12 flex flex-col gap-2">
          <div class="flex flex-col gap-0 justify-center">
            <div class="line-through text-base-content text-xs md:text-base font-light text-left md:text-center -mb-1">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </div>
            <div class="text-base-content text-base lg:text-2xl font-normal text-left md:text-center">
              {formatPrice(price, offers?.priceCurrency)}
            </div>
          </div>
          {cta}
        </div>
      </div>
    </div>
  );
}

export default ProductHorizontal;