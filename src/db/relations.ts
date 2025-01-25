import { relations } from "drizzle-orm/relations";
import { empresas, licencas } from "./schema";

export const licencasRelations = relations(licencas, ({one}) => ({
	empresa: one(empresas, {
		fields: [licencas.empresaId],
		references: [empresas.id]
	}),
}));

export const empresasRelations = relations(empresas, ({many}) => ({
	licencas: many(licencas),
}));