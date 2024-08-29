import {StarIcon as HeroStarIcon} from '@heroicons/react/24/outline';
import {useState} from 'react';

// @typescript-eslint/no-empty-object-type
type StarIconPropType<T extends Record<string, unknown> = object> = {
    isActive: boolean;
} & T;

const StarIcon: React.FC<StarIconPropType> = (props) => {
    const [hovered, setHovered] = useState(props.isActive);

    const propsForDom = {...props};
    delete propsForDom.isActive;
    return (
        <HeroStarIcon
            {...propsForDom}
            className={`text-green-500 ${hovered ? 'fill-current' : 'stroke-current'} cursor-pointer`}
            style={{width: '1.2rem', height: '1.2rem'}}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(props.isActive)}
        />
    );
};

export default StarIcon;