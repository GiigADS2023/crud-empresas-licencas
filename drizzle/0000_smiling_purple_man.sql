-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `empresas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`razao_social` varchar(255) NOT NULL,
	`cnpj` varchar(18) NOT NULL,
	`cep` varchar(10),
	`cidade` varchar(100),
	`estado` varchar(50),
	`bairro` varchar(100),
	`complemento` varchar(255),
	CONSTRAINT `empresas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `licencas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`empresa_id` int NOT NULL,
	`numero` varchar(50),
	`orgao_ambiental` varchar(255),
	`emissao` date,
	`validade` date,
	CONSTRAINT `licencas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `licencas` ADD CONSTRAINT `licencas_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `empresa_id` ON `licencas` (`empresa_id`);
*/