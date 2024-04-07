import { AppContext } from "../../apps/site.ts";
import { SectionProps } from "deco/mod.ts";

export interface Country {
    name: string;
    media: {
        flag: string;
    };
    id: number;
}

export interface Props{ 
    limit?: number;
}

export const loader = async (props: Props, req: Request,  ctx: AppContext) => {
    const limit = props.limit ?? 9;
    const countriesResponse = await fetch('https://api.sampleapis.com/countries/countries');
    const allCountries = (await countriesResponse.json() as Country[]);
    const countries = allCountries.slice(0, limit);
    return{
        ...props,
        countries,
    };
}

export default function Example({ countries }: SectionProps<typeof loader>){
    return (
        <div class="flex flex-col items-center w-[500px] mx-auto gap-3 p-8">
            {countries.map(country => (
                <div>
                    <img src={country.media.flag} alt={`Flag of ${country.name}`} />
                    <span>{country.name}</span>
                </div>
            ))}
        </div>
    )
}