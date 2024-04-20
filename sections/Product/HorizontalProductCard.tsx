export { default } from "../../components/product/HorizontalProductCard.tsx";
import Image from "apps/website/components/Image.tsx";

export function LoadingFallback() {
    return ( 
        <div>
            <div class="flex flex-col gap-2 text-center"><p class="text-xl font-semibold leading-8 lg:leading-10 text-base-content lg:text-3xl uppercase tracking-wide">loading...</p> </div>
            <div class="container flex md:max-w-7xl bg-gray-200 p-4 my-8 rouded-lg "> 
                <div class="w-5/12 md:w-3/12 skeleton animate-pulse h-72 mb-4"></div>
                
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
        <div class="container flex md:max-w-7xl bg-gray-200 p-4 my-8 rouded-lg "> 
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
  