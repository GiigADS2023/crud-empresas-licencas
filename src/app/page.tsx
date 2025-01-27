import CreateEmpresa from "@/components/empresa/CreateEmpresa";
import ListEmpresas from "@/components/empresa/ListEmpresas";
import { GET } from "./api/empresa/route";

export default async function Home() {
  const response = await GET();

  const data = await response.json();

  const empresas = Array.isArray(data.dados) ? data.dados : [];

  return (
    <main className='max-w-6xl mx-auto mt-4'>
      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Empresas</h1>
        <CreateEmpresa />
      </div>
      <ListEmpresas empresas={empresas} />
    </main>
  );
}