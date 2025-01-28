import { NextResponse } from "next/server";
import { createLicenca, getAllLicencas, updateLicenca, deleteLicenca } from "../../../services/licencaService";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const result = await createLicenca(data);
        return NextResponse.json({ sucesso: true, dados: result });
    } catch (erro) {
        console.error("Erro ao criar licença:", erro);
        return NextResponse.json({ sucesso: false, mensagem: "Falha ao criar licença" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const licencas = await getAllLicencas();  
        return NextResponse.json({ sucesso: true, dados: licencas });
    } catch (erro) {
        console.error("Erro ao buscar licenças:", erro);
        return NextResponse.json({ sucesso: false, mensagem: "Falha ao buscar licencas" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const url = new URL(request.url);  
        const id = url.searchParams.get("id");  
        
        if (!id || isNaN(Number(id))) {
            return NextResponse.json({ sucesso: false, mensagem: "ID inválido ou não fornecido" }, { status: 400 });
        }

        const dados = await request.json(); 
        const result = await updateLicenca(Number(id), dados);
        return NextResponse.json({ sucesso: true, dados: result });
    } catch (erro) {
        console.error("Erro ao atualizar licença:", erro);
        return NextResponse.json({ sucesso: false, mensagem: "Falha ao atualizar licença" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");

        if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                { sucesso: false, mensagem: "ID inválido ou não fornecido" },
                { status: 400 }
            );
        }

        const licencaId = Number(id);

        await deleteLicenca(licencaId);

        return NextResponse.json({ sucesso: true, mensagem: "Empresa excluída com sucesso." });
    } catch (erro) {
        console.error("Erro ao excluir licença:", erro);
    }
}