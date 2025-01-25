import { NextResponse } from "next/server";
import { createLicenca, getAllLicencasByEmpresa, updateLicenca, deleteLicenca } from "../../../services/licencaService";

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

export async function GET(request: Request) {
    try {
        const url = new URL(request.url); 
        const empresaId = url.searchParams.get('empresaId'); 
        if (!empresaId) {
            return NextResponse.json({ sucesso: false, mensagem: 'empresaId é obrigatório' }, { status: 400 });
        }

        const licencas = await getAllLicencasByEmpresa(Number(empresaId));
        return NextResponse.json({ sucesso: true, dados: licencas });
    } catch (erro) {
        console.error("Erro ao buscar licenças:", erro);
        return NextResponse.json({ sucesso: false, mensagem: "Falha ao buscar licenças" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, ...dados } = await request.json();
        const result = await updateLicenca(id, dados);
        return NextResponse.json({ sucesso: true, dados: result });
    } catch (erro) {
        console.error("Erro ao atualizar licença:", erro);
        return NextResponse.json({ sucesso: false, mensagem: "Falha ao atualizar licença" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const result = await deleteLicenca(id);
        return NextResponse.json({ sucesso: true, dados: result });
    } catch (erro) {
        console.error("Erro ao excluir licença:", erro);
        return NextResponse.json({ sucesso: false, mensagem: "Falha ao excluir licença" }, { status: 500 });
    }
}