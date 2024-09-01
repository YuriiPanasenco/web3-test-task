import React from 'react';
import {render, fireEvent, screen, waitFor, act} from '@testing-library/react';
import SearchInput from './SearchInput';

describe('SearchInput Component', () => {
    const mockSearchHandler = jest.fn();

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should renders with initial queryString', () => {
        const initialQuery = 'test';
        render(<SearchInput queryString={initialQuery} searchHandler={mockSearchHandler}/>);

        const inputElement = screen.getByPlaceholderText('Search...');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveValue(initialQuery);
    });

    test('should updates input value on change', () => {
        render(<SearchInput queryString="" searchHandler={mockSearchHandler}/>);

        const inputElement = screen.getByPlaceholderText('Search...');
        fireEvent.change(inputElement, {target: {value: 'new value'}});

        expect(inputElement).toHaveValue('new value');
    });

    describe('as a debounce component should', () => {

        test('call searchHandler with debounced value after typing (not press the Enter)', async () => {
            render(<SearchInput queryString="" searchHandler={mockSearchHandler}/>);

            const inputElement = screen.getByPlaceholderText('Search...');
            fireEvent.change(inputElement, {target: {value: 'debounce test'}});

            act(() => {
                jest.advanceTimersByTime(1500);
            });

            await waitFor(() => {
                expect(mockSearchHandler).toHaveBeenCalledWith('debounce test');
                expect(mockSearchHandler).toHaveBeenCalledTimes(1);
            });
        });

        test('call the searchHandler when pressed the Enter key and do not call it again when time is gone', async () => {
            render(<SearchInput queryString="" searchHandler={mockSearchHandler}/>);

            const inputElement = screen.getByPlaceholderText('Search...');
            fireEvent.change(inputElement, {target: {value: 'press enter 1'}});

            fireEvent.keyDown(inputElement, {key: 'Enter', code: 'Enter', charCode: 13});
            expect(mockSearchHandler).toHaveBeenCalledTimes(1);
            act(() => {
                jest.advanceTimersByTime(1500);
            });

            await waitFor(() => {
                expect(mockSearchHandler).toHaveBeenCalledWith('press enter 1');
                expect(mockSearchHandler).toHaveBeenCalledTimes(1);
            });
        });

        test('does not call the searchHandler until the time is gone', async () => {
            render(<SearchInput queryString="" searchHandler={mockSearchHandler}/>);

            const inputElement = screen.getByPlaceholderText('Search...');

            fireEvent.change(inputElement, {target: {value: 'debounce test'}});
            expect(mockSearchHandler).not.toHaveBeenCalled();

            act(() => {
                jest.advanceTimersByTime(1400);
            });
            expect(mockSearchHandler).not.toHaveBeenCalled();

            act(() => {
                jest.advanceTimersByTime(100);
            });

            await waitFor(() => {
                expect(mockSearchHandler).toHaveBeenCalledTimes(1);
                expect(mockSearchHandler).toHaveBeenCalledWith('debounce test');
            });
        });

        test('does not call searchHandler when typing is ongoing', async () => {
            render(<SearchInput queryString="" searchHandler={mockSearchHandler}/>);

            const inputElement = screen.getByPlaceholderText('Search...');

            fireEvent.change(inputElement, {target: {value: 'deb'}});
            act(() => {
                jest.advanceTimersByTime(1000);
            });

            fireEvent.change(inputElement, {target: {value: 'debounce'}});
            act(() => {
                jest.advanceTimersByTime(1000);
            });
            expect(mockSearchHandler).not.toHaveBeenCalled();

            act(() => {
                jest.advanceTimersByTime(1000);
            });

            await waitFor(() => {
                expect(mockSearchHandler).toHaveBeenCalledTimes(1);
                expect(mockSearchHandler).toHaveBeenCalledWith('debounce');
            });
        });
    })
});