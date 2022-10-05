import { LanguageSwitcher } from 'widget/LanguageSwitcher';
import { render, screen } from '@testing-library/react';
import {
    renderWitchTranslation,
} from 'shared/lib/test/renderWitchTranslation/renderWitchTranslation';

describe('LanguageSwitcher.test', () => {
    test('get LanguageSwitcher', () => {
        renderWitchTranslation(
            <LanguageSwitcher />,
        );
        screen.debug();
        expect(screen.getByTestId('toggle-button')).toBeInTheDocument();
    });
});
