"use client";

import { AiFillPlusCircle } from "react-icons/ai";
import ModalEmpresa from "./ModalEmpresa";
import { FormEvent, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

const sendData = async (formData: any) => {
    const response = await fetch('/api/empresa', {
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

const CreateEmpresa = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        razaoSocial: '',
        cnpj: '',
        cep: '',
        cidade: '',
        estado: '',
        bairro: '',
        complemento: ''
    });

    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitNewCompany: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            await sendData(formData);
            setFormData({
                razaoSocial: '',
                cnpj: '',
                cep: '',
                cidade: '',
                estado: '',
                bairro: '',
                complemento: ''
            });
            setModalOpen(false); 
            router.refresh();
        } catch (erro) {
            console.error("Erro ao cadastrar empresa:", erro); 
        }
    };

    return (
        <div>
            <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
                Cadastrar nova empresa <AiFillPlusCircle className="ml-2" size={18} />
            </button>

            <ModalEmpresa modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form className="space-y-6" onSubmit={handleSubmitNewCompany}>
                    <h3 className="font-semibold text-center text-2xl text-gray-800">Cadastrar Nova Empresa</h3>
                    <div className="space-y-4">
                        <input
                            value={formData.razaoSocial}
                            onChange={handleInputChange}
                            name="razaoSocial"
                            type="text"
                            placeholder="Razão Social"
                            className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            value={formData.cnpj}
                            onChange={handleInputChange}
                            name="cnpj"
                            type="text" 
                            placeholder="CNPJ"
                            maxLength={14}
                            required
                            inputMode="numeric"  
                            pattern="\d*" 
                            className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            value={formData.cep}
                            onChange={handleInputChange}
                            name="cep"
                            type="text"  
                            placeholder="CEP"
                            maxLength={8}
                            required
                            inputMode="numeric"  
                            pattern="\d*" 
                            className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            value={formData.cidade}
                            onChange={handleInputChange}
                            name="cidade"
                            type="text"
                            placeholder="Cidade"
                            required
                            className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            value={formData.estado}
                            onChange={handleInputChange}
                            name="estado"
                            type="text"
                            maxLength={2}
                            placeholder="Estado"
                            required
                            className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            value={formData.bairro}
                            onChange={handleInputChange}
                            name="bairro"
                            type="text"
                            placeholder="Bairro"
                            required
                            className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            value={formData.complemento}
                            onChange={handleInputChange}
                            name="complemento"
                            type="text"
                            placeholder="Complemento"
                            className="input input-bordered w-full px-4 py-3 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button type="submit" className="btn">
                            Salvar
                        </button>
                    </div>
                </form>
            </ModalEmpresa>
        </div>
    );
}

export default CreateEmpresa;