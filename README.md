# CRUD de Empresas e Licenças Ambientais

Este projeto implementa um CRUD simples para gerenciar empresas e suas licenças ambientais, desenvolvido como parte de um desafio técnico para o processo seletivo de Desenvolvedor Full Stack.

---

## Tecnologias Utilizadas

- **Framework Frontend**: Next.js 13+
- **Linguagem**: TypeScript
- **Banco de Dados**: MySQL
- **ORM**: Drizzle ORM
- **Gerenciamento de Estados e Formulários**: react-hook-form
- **Estilização**: TailwindCSS

---

## Funcionalidades Implementadas

### CRUD de Empresas e Licenças

#### Empresa

**Campos:**
- Razão social
- CNPJ
- CEP
- Cidade
- Estado
- Bairro
- Complemento

#### Licença Ambiental

**Campos:**
- Empresa vinculada (select)
- Número da licença
- Órgão ambiental
- Data de emissão
- Data de validade

- Exibe os códigos das empresas vinculadas à linceças ambientais e permite adicionar novas.

### Validações de Campos
- **CEP**: Aceita no máximo 8 caracteres numéricos.
- **CNPJ**: Aceita no máximo 14 caracteres numéricos.

### Validações de Exclusão

#### Exclusão de Empresa
- Alerta caso existam licenças vinculadas à empresa, impedindo a exclusão.
- Empresas sem licenças vinculadas podem ser excluídas normalmente.

#### Exclusão de Licenças
- Alerta informando que a exclusão desvinculará a licença da empresa correspondente.

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão LTS recomendada)
- **MySQL**
- **Yarn** ou **NPM**

---

## Instalação e Configuração

1. **Clone o repositório:**

```bash
git https://github.com/GiigADS2023/crud-empresas-licencas.git
cd crud-empresas-licencas
```

2. **Instale as dependências:**

```bash
npm install 
# ou  
yarn install
```

3. **Configure as variáveis de ambiente:**
Altere o arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DATABASE_URL=mysql://root:root@localhost:3306/dbempresas  

```

4. **Tabelas**

```
CREATE TABLE empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    razao_social VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18) NOT NULL,
    cep VARCHAR(10),
    cidade VARCHAR(100),
    estado VARCHAR(50),
    bairro VARCHAR(100),
    complemento VARCHAR(255)
);

CREATE TABLE licencas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL,
    numero VARCHAR(50),
    orgao_ambiental VARCHAR(255),
    emissao DATE,
    validade DATE,
    FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE CASCADE
);
```


5. **Execute as migrações no banco de dados:**

```bash
npm i drizzle-orm mysql2 
npm i -D drizzle-kit tsx
```

6. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev  
# ou  
yarn dev
```

7. **Acesse a aplicação:**

Abra o navegador em [http://localhost:3000](http://localhost:3000)

---

## Como Utilizar

1. **Home || Cadastro de Empresa:**
   - Visualize a lista de empresas cadastradas.
   - Clique em "Cadastrar Nova Empresa" para adicionar uma nova.
   - Preencha os campos

2. **Cadastro de Licenças Ambientais:**
   - Escolha a empresa correspondente.
   - Preencha os dados e salve.

---

## Rotas de API

- **GET** `http://localhost:3000/api/empresa`: Lista todas as empresas.
- **POST** `http://localhost:3000/api/empresa`: Cria uma nova empresa.
- **PUT** `http://localhost:3000/api/empresa?id={empresa.id}`: Atualiza uma empresa existente.
- **DELETE** `http://localhost:3000/api/empresa?id={empresa.id}`: Remove uma empresa.

- **GET** `http://localhost:3000/api/licenca`: Lista todas as licenças.
- **POST** `http://localhost:3000/api/licenca`: Cria uma nova licença.
- **PUT** `http://localhost:3000/api/licenca?id={licensas.id}`: Atualiza uma licença existente.
- **DELETE** `http://localhost:3000/api/licenca?id={licenca.id}`: Remove uma licença.

---

## Contato

Para dúvidas ou sugestões, envie um e-mail para **giorgiabschmidtADS@gmail.com**.