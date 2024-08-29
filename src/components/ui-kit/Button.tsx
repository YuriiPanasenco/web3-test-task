import React from 'react';

interface ButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({text, onClick, className}) => {
    return (
        <button onClick={onClick} className={`px-6 py-2 rounded-full text-gray-300 bg-black hover:bg-gray-800 focus:outline-none ${className}`}>
            {text}
        </button>
    );
};

export default Button;