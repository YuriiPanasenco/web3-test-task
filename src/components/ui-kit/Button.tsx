import React from 'react';

interface ButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({text, onClick, className, disabled = false}) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`px-6 py-2 rounded-full text-gray-300 bg-black hover:bg-gray-800 focus:outline-none ${className} ${disabled ? 'bg-gray-400 cursor-not-allowed' : ''}`}>
            {text}
        </button>
    );
};

export default Button;