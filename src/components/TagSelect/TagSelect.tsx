import React from 'react';
import Select from 'react-select';
import './TagSelect.css'; // Import the custom CSS styles

interface Option {
    value: string;
    label: string;
    active: boolean;
}

type TagSelectPropsType = {
    options: Option[],
    onChange: (option: Option[]) => void
}

const defaultOption: Option[] = [
    {value: 'option1', label: 'Option 1', active: false},
    {value: 'option2', label: 'Option 2', active: false},
    {value: 'option3', label: 'Option 3', active: false},
    {value: 'option4', label: 'Option 4', active: false},
];


const TagSelect: React.FC<TagSelectPropsType> = ({options = defaultOption, onChange}) => {

    return (
        <div className="w-full max-w-sm">
            <Select
                isMulti
                options={options}
                onChange={onChange}
                placeholder="Select options..."
                className="react-select-container"
                classNamePrefix="react-select"
            />
        </div>
    );
};

export default TagSelect;
