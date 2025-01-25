import { licencas } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "../db/index";

export const createLicenca = async (data: {
    numero: string;
    orgaoAmbiental: string;
    emissao: string;
    validade: string;
    empresaId: number;
}) => {
    const result = await db.insert(licencas).values(data);
    return result;
};

export const getAllLicencasByEmpresa = async (empresaId: number) => {
    const result = await db.select().from(licencas).where(eq(licencas.empresaId, empresaId));
    return result;
};

export const updateLicenca = async (id: number, data: Partial<{
    numero: string;
    orgaoAmbiental: string;
    emissao: string;
    validade: string;
    empresaId: number;
}>) => {
    const result = await db.update(licencas).set(data).where(eq(licencas.id, id));
    return result;
};

export const deleteLicenca = async (id: number) => {
    const result = await db.delete(licencas).where(eq(licencas.id, id));
    return result;
};