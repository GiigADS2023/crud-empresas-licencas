"use client";

import { useState, useEffect } from "react";
import { ILicenca } from "../../../types/licencas";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import ModalLicenca from "./ModalLicenca";
import { useRouter } from "next/navigation";

interface LicencaProps {
  licenca: ILicenca;
}

interface IResponse {
    sucesso: boolean;
    mensagem: string;
    dados?: any; 
}

const Licenca: React.FC<LicencaProps> = ({ licenca }) => {
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [licencaToEdit, setLicencaToEdit] = useState<ILicenca>(licenca);
    const [empresas, setEmpresas] = useState<any[]>([]); 

    const router = useRouter();

    const fetchEmpresas = async () => {
        const response = await fetch("/api/empresa");  
        const result = await response.json();
        if (result.sucesso) {
            setEmpresas(result.dados);
        } else {
            console.error("Erro ao buscar empresas");
        }
    };

    useEffect(() => {
        fetchEmpresas();  
    }, []); 

    const sendData = async (formData: ILicenca) => {
        const dataEmissao = formData.emissao ? new Date(formData.emissao) : null;
        const dataValidade = formData.validade ? new Date(formData.validade) : null;
    
        const response = await fetch(`/api/licenca?id=${formData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                emissao: dataEmissao?.toISOString().split('T')[0] ?? null,
                validade: dataValidade?.toISOString().split('T')[0] ?? null
            }),
        });
    
        const result = await response.json();
        if (result.sucesso) {
            return result.dados;
        } else {
            throw new Error(result.mensagem || 'Erro ao enviar dados');
        }
    };    

    const handleInputChange = (e: React.ChangeEvent<HTMLElement>) => {
        const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    
        setLicencaToEdit(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };       

    const handleSubmitEditLicence = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
        await sendData(licencaToEdit); 
        setOpenModalEdit(false); 
        router.refresh();
        } catch (erro) {
        console.error("Erro ao editar licença:", erro);
        }
    };

    const handleDeleteLicence = async (licenceId: number) => {
        const isConfirmed = window.confirm(
            "Tem certeza que deseja excluir esta licença? Esta licença está vinculada a uma empresa e, ao excluir, ela não será mais associada a essa empresa."
        );
    
        if (isConfirmed) {
            try {
                const response = await fetch(`/api/licenca?id=${licenceId}`, {
                    method: 'DELETE',
                });
    
                const result: IResponse = await response.json();
    
                if (result.sucesso) {
                    console.log("Licença excluída com sucesso");
                    router.refresh();
                } else {
                    alert(result.mensagem);
                    console.error(result.mensagem);
                }
            } catch (error) {
                console.error("Erro ao excluir licença:", error);
            }
        } else {
            console.log("Exclusão cancelada");
        }
    };    

    return (
        <tr key={licenca.id}>
            <td className="w-auto">{licenca.id}</td>
            <td className="w-auto">{licenca.empresaId}</td>
            <td className="w-auto">{licenca.numero}</td>
            <td className="w-auto">{licenca.orgaoAmbiental}</td>
            <td className="w-auto">{licenca.emissao}</td>
            <td className="w-auto">{licenca.validade}</td>
            <td className="flex gap-5">
                <FiEdit
                onClick={() => {
                    setLicencaToEdit(licenca); 
                    setOpenModalEdit(true); 
                }}
                cursor="pointer"
                className="text-blue-400"
                size={25}
                />
                <ModalLicenca modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                <form className="space-y-6 w-full max-w-xl mx-auto" onSubmit={handleSubmitEditLicence}>
                    <h3 className="font-semibold text-center text-2xl text-gray-800">Editar Licença</h3>
                    <div className="space-y-4 flex flex-col">
                        <select
                            className="select select-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={licencaToEdit.empresaId}
                            onChange={handleInputChange}
                            name="empresaId"
                            required
                        >
                            <option value="" disabled>Selecione a Empresa</option>
                            {empresas.map((empresa) => (
                                <option key={empresa.id} value={empresa.id}>
                                    {empresa.id} - {empresa.cnpj} 
                                </option>
                            ))}
                        </select>
                        <input
                            value={licencaToEdit.numero}
                            onChange={handleInputChange}
                            name="numero"
                            type="text" 
                            placeholder="Número"
                            required
                            className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            value={licencaToEdit.orgaoAmbiental}
                            onChange={handleInputChange}
                            name="orgaoAmbiental"
                            type="text" 
                            placeholder="Orgão Ambiental"
                            required
                            className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    <input
                        value={licencaToEdit.emissao} 
                        onChange={handleInputChange}
                        name="emissao"
                        type="date" 
                        required
                        className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        value={licencaToEdit.validade} 
                        onChange={handleInputChange}
                        name="validade"
                        type="date" 
                        required
                        className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button type="submit" className="btn">
                            Salvar as alterações
                        </button>
                    </div>
                </form>
                </ModalLicenca>

                <FiTrash2
                    cursor="pointer"
                    className="text-red-400"
                    size={25}
                    onClick={() => handleDeleteLicence(licenca.id)}
                />
            </td>
        </tr>
    );
};

export default Licenca;