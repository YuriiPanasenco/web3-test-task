import React, {ReactNode} from 'react';
import Button from "./Button";

type ModalPropsType = {
    onClose: () => void;
    children: ReactNode;
    actions?: React.JSX;
}

const Modal: React.FC<ModalPropsType> = ({onClose, children, actions}) => {

    return (
        <div className="fixed inset-0 z-50 flex items-center ">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto z-10">
                {children}
                <div className="flex justify-center gap-1 border-t border-gray-200 border-solid pt-[15px] mt-[15px]">
                    <Button
                        text="Close"
                        className="bg-blue-500 justify-center hover:bg-red-600"
                        onClick={onClose}
                    />
                    {actions}
                </div>
            </div>
        </div>
    );
};

export default Modal;
