import { MatchContext } from "deco/blocks/matcher.ts";

export interface Props {
  utm_campaign: string;
}

export default function UtmCampaign({ utm_campaign }: Props, { request }: MatchContext,) { 
  const url = new URL(request.url); 
  const param = url.searchParams.get("utm_campaign"); 
  return utm_campaign === param;
}; 