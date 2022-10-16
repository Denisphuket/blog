import { screen } from '@testing-library/react';
import { ComponentRender } from 'shared/lib/test/componentRender/componentRender';
import { userEvent } from '@storybook/testing-library';
import { Counter } from './Counter';

describe('Counter.test', () => {
    test('initialState 10', () => {
        ComponentRender(<Counter />, {
            initialState: {
                counter: { value: 10 },
            },
        });
        expect(screen.getByTestId('value-title')).toHaveTextContent('10');
    });

    test('initialState 10', () => {
        ComponentRender(<Counter />, {
            initialState: {
                counter: { value: 10 },
            },
        });
        userEvent.click(screen.getByTestId('increment-btn'));
        expect(screen.getByTestId('value-title')).toHaveTextContent('11');
    });

    test('initialState 10', () => {
        ComponentRender(<Counter />, {
            initialState: {
                counter: { value: 10 },
            },
        });
        userEvent.click(screen.getByTestId('decrement-btn'));
        expect(screen.getByTestId('value-title')).toHaveTextContent('9');
    });
});
