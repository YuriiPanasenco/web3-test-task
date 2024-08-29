import {StarIcon as HeroStarIcon} from '@heroicons/react/24/outline';

type StarIconPropType<T extends Record<string, unknown> = object> = {
    isActive: boolean;
} & T;

const StarIcon: React.FC<StarIconPropType> = (props) => {
    const propsForDom = {...props};
    delete propsForDom.isActive;
    return (
        <HeroStarIcon
            {...propsForDom}
            className={`text-green-500 ${props.isActive ? 'fill-current' : 'stroke-current'} cursor-pointer`}
            style={{width: '1.2rem', height: '1.2rem'}}
        />
    );
};

export default StarIcon;