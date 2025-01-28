import { GET } from "../api/licenca/route"
import CreateLicenca from "@/components/licenca/CreateLicenca";
import ListLicenca from "@/components/licenca/ListLicencas";

export default async function Licencas() {
    const response = await GET();

    const data = await response.json();

    const licencas = Array.isArray(data.dados) ? data.dados : [];
    return (
        <main className="max-w-6xl mx-auto mt-4 px-4 sm:px-6 lg:px-8">
            <div className="text-center my-5 flex flex-col gap-4">
                <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">Licenças</h1>
                <CreateLicenca />
            </div>
            <ListLicenca licencas={licencas}/>
        </main>
    )
}