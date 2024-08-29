import React, {useRef} from 'react';
import clickSound from '../../assets/mixkit-single-key-press-in-a-laptop-2541.mp3';

type ClickSoundWrapperPropsType = {
    children: React.ReactNode,
    onClick?: () => void
}

const ClickSoundWrapper: React.FC<ClickSoundWrapperPropsType> = ({children, onClick}) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleClick = () => {
        onClick();
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <div onClick={handleClick} className="cursor-pointer"> {/* Tailwind CSS to change cursor on hover */}
            {children}
            <audio ref={audioRef} src={clickSound}/>
        </div>
    );
};

export default ClickSoundWrapper;
