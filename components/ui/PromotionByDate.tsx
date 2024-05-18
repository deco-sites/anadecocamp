import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
    banner: ImageWidget;
    alt: string;
    /**
     * @title Initial Date and Time
     * @format datetime
     */
    initialData: string;
    /**
     * @title Final Date and Time
     * @format datetime
     */
    finalData: string;
}

export default function Weather({ initialData, finalData, banner, alt }: Props) {
    const now = new Date();
    const startDate = new Date(initialData);
    const endDate = new Date(finalData);

    const isWithinDateRange = now >= startDate && now <= endDate;

    return (
        <div class="container py-6 justify-center flex px-4" date-initial={initialData} date-final={finalData}> 
            {isWithinDateRange && ( 
                <figure>
                    <Image
                    class="card"
                    src={banner}
                    alt={alt}
                    width={401}
                    height={178}
                    loading="lazy"
                    />
                </figure> 
            )}
        </div>
    );
}
