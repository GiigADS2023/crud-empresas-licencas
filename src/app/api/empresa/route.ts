import { NextResponse } from "next/server";
import { createEmpresa, getAllEmpresas, updateEmpresa, deleteEmpresa } from "../../../services/empresaService";

export async function POST(request: Request) {
    try {
        const data = await request.json();  
        const result = await createEmpresa(data);  
        return NextResponse.json({ sucesso: true, dados: result });
    } catch (erro) {
        console.error("Erro ao criar empresa:", erro);
        return NextResponse.json({ sucesso: false, mensagem: "Falha ao criar empresa" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const empresas = await getAllEmpresas();  
        return NextResponse.json({ sucesso: true, dados: empresas });
    } catch (erro) {
        console.error("Erro ao buscar empresas:", erro);
        return NextResponse.json({ sucesso: false, mensagem: "Falha ao buscar empresas" }, { status: 500 });
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
        const result = await updateEmpresa(Number(id), dados);
        return NextResponse.json({ sucesso: true, dados: result });
    } catch (erro) {
        console.error("Erro ao atualizar empresa:", erro);
        return NextResponse.json({ sucesso: false, mensagem: "Falha ao atualizar empresa" }, { status: 500 });
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

        const empresaId = Number(id);

        await deleteEmpresa(empresaId);

        return NextResponse.json({ sucesso: true, mensagem: "Empresa excluída com sucesso." });
    } catch (erro) {
        console.error("Erro ao excluir empresa:", erro);
        return NextResponse.json(
            { sucesso: false, mensagem: "A empresa não pode ser excluída enquanto tiver licenças vinculadas." },
            { status: 400 }
        );
    }
}