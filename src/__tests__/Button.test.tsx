import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Button from '../components/ui-kit/Button';

describe('Button component', () => {
    it('renders with the correct label', () => {
        render(<Button label="Click Me" onClick={() => {
        }}/>);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', () => {
        const handleClick = jest.fn();
        render(<Button label="Click Me" onClick={handleClick}/>);
        fireEvent.click(screen.getByText('Click Me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});