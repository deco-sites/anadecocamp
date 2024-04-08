export interface Props {
    titulo: string;
    descricao: string; 
    codigoDoCupom: string; 
}

export default function Cupom(
  { titulo,descricao,codigoDoCupom }: Props,
) { 
  return (
    <div class="container py-10">
      <h2 class="text-center separador-secondary text-5xl pb-6">
        {titulo} 
      </h2>
      <div class="text-center text-base">{descricao}</div>  
      <div class="flex justify-center">
            <span class="border-dashed border-2 rounded-md my-2 text-4xl p-4">{codigoDoCupom}</span>
        </div>
    </div>
  );
}