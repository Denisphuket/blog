import {
    renderWitchTranslation,
} from 'shared/lib/test/renderWitchTranslation/renderWitchTranslation';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from 'widget/Navbar';

describe('Navbar.test', () => {
    test('', () => {
        renderWitchTranslation(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>,
        );
    });
});
