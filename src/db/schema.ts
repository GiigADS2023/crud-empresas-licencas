import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, varchar, index, foreignKey, date } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const empresas = mysqlTable("empresas", {
	id: int().autoincrement().notNull(),
	razaoSocial: varchar("razao_social", { length: 255 }).notNull(),
	cnpj: varchar({ length: 18 }).notNull(),
	cep: varchar({ length: 10 }),
	cidade: varchar({ length: 100 }),
	estado: varchar({ length: 50 }),
	bairro: varchar({ length: 100 }),
	complemento: varchar({ length: 255 }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "empresas_id"}),
]);

export const licencas = mysqlTable("licencas", {
	id: int().autoincrement().notNull(),
	empresaId: int("empresa_id").notNull().references(() => empresas.id, { onDelete: "cascade" } ),
	numero: varchar({ length: 50 }),
	orgaoAmbiental: varchar("orgao_ambiental", { length: 255 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	emissao: date({ mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	validade: date({ mode: 'string' }),
},
(table) => [
	index("empresa_id").on(table.empresaId),
	primaryKey({ columns: [table.id], name: "licencas_id"}),
]);
