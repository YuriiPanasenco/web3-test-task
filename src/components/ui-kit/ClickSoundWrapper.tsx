import React from 'react';
import clickSound from '../../assets/mixkit-single-key-press-in-a-laptop-2541.mp3';


let audioInstance: HTMLAudioElement | null = null;

const getAudioInstance = () => {
    if (!audioInstance) {
        audioInstance = new Audio(clickSound);
    }
    return audioInstance;
};

type ClickSoundWrapperPropsType = {
    children: React.ReactNode,
    onClick?: () => void
}

const ClickSoundWrapper: React.FC<ClickSoundWrapperPropsType> = ({children, onClick}) => {

    const handleClick = () => {
        onClick();
        const audio = getAudioInstance();
        audio.play();

    };

    return (
        <div onClick={handleClick} className="cursor-pointer"> {/* Tailwind CSS to change cursor on hover */}
            {children}
        </div>
    );
};

export default ClickSoundWrapper;
