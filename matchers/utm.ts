import { MatchContext } from "deco/blocks/matcher.ts";

export interface Props {
  utm_campaign: string;
}

export default function UtmCampaign(props: Props, ctx: MatchContext) {
  const campanha = ('utm_campaign=' + props.utm_campaign); 
  console.log('ctx.request.headers');
  console.log(ctx.request.headers);
  return ctx.request.headers.get("referer")?.includes(
    campanha,
  ) ?? false;
} 