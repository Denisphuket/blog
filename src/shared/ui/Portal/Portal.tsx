import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
	elenent?: HTMLElement
}
export const Portal = (props: PortalProps) => {
    const {
        children,
        elenent = document.body,
    } = props;

    return createPortal(children, elenent);
};
