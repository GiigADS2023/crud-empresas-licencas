import React from "react";

interface ModalEmpresaProps {
    modalOpen: boolean;
    setModalOpen: (open : boolean) => boolean | void;
    children: React.ReactNode
}

const ModalEmpresa: React.FC<ModalEmpresaProps> = ({modalOpen, setModalOpen, children}) => {
    return (
        <div className={`modal ${modalOpen ? "modal-open" : ""} flex justify-center items-center fixed inset-0 z-50 bg-gray-900 bg-opacity-50`}>
            <div className="modal-box relative max-w-lg w-full">
                <label onClick={() => setModalOpen(false)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                {children}
            </div>
        </div>
    );
}

export default ModalEmpresa;