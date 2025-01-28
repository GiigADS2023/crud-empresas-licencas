"use client";

import { useState } from "react";
import { IEmpresa } from "../../../types/empresas";
import { FiEdit, FiTrash2, FiFileText } from "react-icons/fi";
import ModalEmpresa from "./ModalEmpresa";
import { useRouter } from "next/navigation";

interface EmpresaProps {
  empresa: IEmpresa;
}

interface IResponse {
    sucesso: boolean;
    mensagem: string;
    dados?: any; 
}

const Empresa: React.FC<EmpresaProps> = ({ empresa }) => {
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [empresaToEdit, setEmpresaToEdit] = useState<IEmpresa>(empresa); 
    const [licencas, setLicencas] = useState<any[]>([]);

    const router = useRouter();

    const sendData = async (formData: IEmpresa) => {
        const response = await fetch(`/api/empresa?id=${formData.id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (result.sucesso) {
            return result.dados;
        } else {
            throw new Error(result.mensagem || 'Erro ao enviar dados');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmpresaToEdit(prevState => ({
        ...prevState,
        [name]: value,
        }));
    };

    const handleSubmitEditCompany = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
        await sendData(empresaToEdit); 
        setOpenModalEdit(false); 
        router.refresh();
        } catch (erro) {
        console.error("Erro ao editar empresa:", erro);
        }
    };

    const handleDeleteCompany = async (empresaId: number) => {
        const isConfirmed = window.confirm("Tem certeza que deseja excluir esta empresa?");
      
        if (isConfirmed) {
            try {
                const response = await fetch(`/api/empresa?id=${empresaId}`, {
                    method: 'DELETE',
                });
    
                const result: IResponse = await response.json();
                
                if (result.sucesso) {
                    console.log("Empresa excluída com sucesso");
                    router.refresh();
                } else {
                    alert(result.mensagem);
                    console.error(result.mensagem);
                }
            } catch (error) {
                console.error("Erro ao excluir empresa:", error);
            }
        } else {
            console.log("Exclusão cancelada");
        }
    };    

    return (
        <tr key={empresa.id}>
            <td className="w-auto">{empresa.id}</td>
            <td className="w-auto">{empresa.razaoSocial}</td>
            <td className="w-auto">{empresa.cnpj}</td>
            <td className="w-auto">{empresa.cep}</td>
            <td className="w-auto">{empresa.cidade}</td>
            <td className="w-auto">{empresa.estado}</td>
            <td className="w-auto">{empresa.bairro}</td>
            <td className="w-auto">{empresa.complemento}</td>
            <td className="flex gap-5">
                <FiEdit
                onClick={() => {
                    setEmpresaToEdit(empresa); 
                    setOpenModalEdit(true); 
                }}
                cursor="pointer"
                className="text-blue-400"
                size={25}
                />
                <ModalEmpresa modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                <form className="space-y-6 w-full max-w-xl mx-auto" onSubmit={handleSubmitEditCompany}>
                    <h3 className="font-semibold text-center text-2xl text-gray-800">Editar Empresa</h3>
                    <div className="space-y-4 flex flex-col">
                        <input
                            value={empresaToEdit.razaoSocial}
                            onChange={handleInputChange}
                            name="razaoSocial"
                            type="text"
                            placeholder="Razão Social"
                            className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            value={empresaToEdit.cnpj}
                            onChange={handleInputChange}
                            name="cnpj"
                            type="text"
                            placeholder="CNPJ"
                            maxLength={14}
                            minLength={14}
                            required
                            inputMode="numeric"
                            pattern="\d*"
                            className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            value={empresaToEdit.cep}
                            onChange={handleInputChange}
                            name="cep"
                            type="text"
                            placeholder="CEP"
                            maxLength={8}
                            minLength={8}
                            required
                            inputMode="numeric"
                            pattern="\d*"
                            className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            value={empresaToEdit.cidade}
                            onChange={handleInputChange}
                            name="cidade"
                            type="text"
                            placeholder="Cidade"
                            required
                            className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            value={empresaToEdit.estado}
                            onChange={handleInputChange}
                            name="estado"
                            type="text"
                            maxLength={2}
                            placeholder="Estado"
                            required
                            className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            value={empresaToEdit.bairro}
                            onChange={handleInputChange}
                            name="bairro"
                            type="text"
                            placeholder="Bairro"
                            required
                            className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            value={empresaToEdit.complemento}
                            onChange={handleInputChange}
                            name="complemento"
                            type="text"
                            placeholder="Complemento"
                            className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button type="submit" className="btn">
                            Salvar as alterações
                        </button>
                    </div>
                </form>
                </ModalEmpresa>

                <FiTrash2
                    cursor="pointer"
                    className="text-red-400"
                    size={25}
                    onClick={() => handleDeleteCompany(empresa.id)}
                />
            </td>
        </tr>
  );
};

export default Empresa;