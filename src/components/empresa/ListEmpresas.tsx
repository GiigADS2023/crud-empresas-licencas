import {IEmpresa} from "../../../types/empresas";
import React from "react"; 
import Empresa from "@/components/empresa/Empresa"

interface EmpresaListProps {
    empresas: IEmpresa[];
}

const ListEmpresas: React.FC<EmpresaListProps> = ({ empresas = [] }) => {
    if (!Array.isArray(empresas)) {
      return <div>Erro: Dados inválidos</div>;  
    }
  
    return (
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Razão social</th>
              <th>CNPJ</th>
              <th>CEP</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Bairro</th>
              <th>Complemento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map(empresa => 
              <Empresa key={empresa.id} empresa={empresa}/>
            )}
          </tbody>
        </table>
      </div>
    );
  }
  
export default ListEmpresas;