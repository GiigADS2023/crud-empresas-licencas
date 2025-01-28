"use client";

import { AiFillPlusCircle } from "react-icons/ai";
import ModalLicenca from "./ModalLicenca";
import { FormEventHandler, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const sendData = async (formData: any) => {
    const response = await fetch('/api/licenca', {
        method: 'POST',
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

const CreateLicenca = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [empresas, setEmpresas] = useState<any[]>([]);  
    const [formData, setFormData] = useState({
        empresaId: '',
        numero: '',
        orgaoAmbiental: '',
        emissao: '',
        validade: ''
    });

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

    const handleInputChange = (e: React.ChangeEvent<HTMLElement>) => {
        const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const handleSubmitNewLincence: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            await sendData(formData);
            setFormData({
                empresaId: '',
                numero: '',
                orgaoAmbiental: '',
                emissao: '',
                validade: ''
            });
            setModalOpen(false); 
            router.refresh();
        } catch (erro) {
            console.error("Erro ao cadastrar licença:", erro); 
        }
    };

    return (
        <div>
            <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
                Cadastrar nova licença <AiFillPlusCircle className="ml-2" size={18} />
            </button>

            <ModalLicenca modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form className="space-y-6" onSubmit={handleSubmitNewLincence}>
                    <h3 className="font-semibold text-center text-2xl text-gray-800">Cadastrar Nova Licença</h3>
                    <div className="space-y-4">
                        <select
                            className="select select-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={formData.empresaId}
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
                            value={formData.numero}
                            onChange={handleInputChange}
                            name="numero"
                            type="text" 
                            placeholder="Número"
                            required
                            className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            value={formData.orgaoAmbiental}
                            onChange={handleInputChange}
                            name="orgaoAmbiental"
                            type="text" 
                            placeholder="Orgão Ambiental"
                            required
                            className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            value={formData.emissao}
                            onChange={handleInputChange}
                            name="emissao"
                            type="date" 
                            placeholder="Emissão"
                            required
                            className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            value={formData.validade}
                            onChange={handleInputChange}
                            name="validade"
                            type="date" 
                            placeholder="Validade"
                            required
                            className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button type="submit" className="btn">
                            Salvar
                        </button>
                    </div>
                </form>
            </ModalLicenca>
        </div>
    );
}

export default CreateLicenca;