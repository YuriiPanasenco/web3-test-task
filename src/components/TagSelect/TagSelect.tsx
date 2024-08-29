import React, {useCallback} from 'react';
import ReactSelect from 'react-select';
import './TagSelect.css';

interface Option {
    value: string;
    label: string;
    active: boolean;
}

type SelectPropsType = {
    isMulti: boolean
    options: Option[],
    placeholder?: string
    onChange: (option: Option[]) => void
}


const Select: React.FC<SelectPropsType> = ({options, onChange, isMulti, placeholder}) => {
    const variants = options.slice(0, options.length - 1);

    if (!isMulti) {
        variants.unshift({value: null, label: "All", active: true});
    }

    const handleChange = useCallback((c) => {
        if (!isMulti) {
            const selectIndex = options.findIndex(o => o === c);
            if (selectIndex === -1) {
                onChange([]);
            } else {
                onChange([options[selectIndex]]);
            }
        } else {
            onChange(c);
        }
    }, [onChange, options, isMulti]);

    return (
        <div className="w-full max-w-sm">
            <ReactSelect
                isMulti={isMulti}
                options={variants}
                onChange={handleChange}
                placeholder={placeholder || "Select options..."}
                className="react-select-container"
                classNamePrefix="react-select"
            />
        </div>
    );
};

export default Select;
