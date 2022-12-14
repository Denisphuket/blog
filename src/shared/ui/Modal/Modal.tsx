import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { Portal } from 'shared/ui/Portal/Portal';
import { useTheme } from 'app/providers/ThemeProvider';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
	children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazyLoad?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const { theme } = useTheme();
    const {
        className,
        children,
        isOpen,
        onClose,
        lazyLoad,
    } = props;

    const [isClosed, setIsClosed] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosed(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosed(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onClickContent = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, closeHandler, onKeyDown]);

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.isClosed]: isClosed,
    };

    if (lazyLoad && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div className={cls.content} onClick={onClickContent}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>

    );
};
