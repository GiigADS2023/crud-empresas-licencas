export interface IEmpresa {
        id: number,
        razaoSocial: string,
        cnpj: string,
        cep: string,
        cidade: string,
        estado: string,
        bairro: string,
        complemento?: string,
}