import { db } from "../db";
import { empresas } from "../db/schema";
import { eq } from 'drizzle-orm';

export const createEmpresa = async (data: {
    razaoSocial: string;
    cnpj: string;
    cep: string;
    cidade: string;
    estado: string;
    bairro: string;
    complemento?: string;
}) => {
    const result = await db.insert(empresas).values(data);
    return result;
};

export const getAllEmpresas = async () => {
    const result = await db.select().from(empresas);
    return result;
};

export const updateEmpresa = async (id: number, data: Partial<{
    razaoSocial: string;
    cnpj: string;
    cep: string;
    cidade: string;
    estado: string;
    bairro: string;
    complemento?: string;
}>) => {
    const result = await db.update(empresas).set(data).where(eq(empresas.id, id));
    return result;
};

export const deleteEmpresa = async (id: number) => {
    const result = await db.delete(empresas).where(eq(empresas.id, id));
    return result;
}