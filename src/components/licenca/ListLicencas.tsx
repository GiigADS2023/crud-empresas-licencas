import React from "react"; 
import Licenca from "@/components/licenca/Licenca"
import { ILicenca } from "../../../types/licencas";

interface LicencaListProps {
    licencas: ILicenca[];
}

const ListLicencas: React.FC<LicencaListProps> = ({ licencas = [] }) => {
    if (!Array.isArray(licencas)) {
      return <div>Erro: Dados inválidos</div>;  
    }
  
    return (
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Cód. Empresa</th>
              <th>Número</th>
              <th>Orgão Ambiental</th>
              <th>Emissão</th>
              <th>Validade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {licencas.map(licenca => 
              <Licenca key={licenca.id} licenca={licenca}/>
            )}
          </tbody>
        </table>
      </div>
    );
  }
  
export default ListLicencas;