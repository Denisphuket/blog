import React, {
    memo, useCallback, useEffect, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import {
    getCardCvc, getCardIsError, getCardMonth, getCardPan, getCardYear,
} from 'entities/Card';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { SendEncryptCardToServer } from 'features/sendCardToServer';
import { useNavigate } from 'react-router-dom';
import * as crypto from 'crypto-browserify';
import cls from './PaymentButton.module.scss';

interface PaymentButtonProps {
    order: string;
    className?: string;
}
export const PaymentButton = memo((props: PaymentButtonProps) => {
    const {
        order,
        className,
    } = props;

    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const cardPan = useSelector(getCardPan);
    const cardMonth = useSelector(getCardMonth);
    const cardYear = useSelector(getCardYear);
    const cardCvc = useSelector(getCardCvc);
    const isError = useSelector(getCardIsError);

    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        if (cardPan && cardMonth !== 0 && cardYear !== 0 && cardCvc && !isError) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [cardMonth, cardPan, cardYear, cardCvc, isError]);

    const submit = useCallback(() => {
        if (!isDisabled) {
            const publicKey = process.env.REACT_APP_PUBLIC_KEY;
            const card = {
                cvc: cardCvc,
                month: cardMonth,
                pan: cardPan,
                year: cardYear,
            };
            const cardString = JSON.stringify(card);
            const encoder = new TextEncoder();
            const cardWords = encoder.encode(cardString);
            const encrypted = crypto.publicEncrypt({
                key: publicKey,
                padding: 1,
            }, cardWords);
            // const encryptCard = btoa(new TextDecoder().decode(new Uint8Array(encrypted)));
            const encryptCard = encrypted.toString('base64');

            dispatch(SendEncryptCardToServer({
                order,
                encryptCard,
            }));
            navigate(`/authorise/${order}`);
        }
    }, [isDisabled, cardCvc, cardMonth, cardPan, cardYear, dispatch, order, navigate]);

    return (
        <div className={classNames(cls.PaymentButton, {}, [className])}>
            <Button
                disabled={isDisabled}
                color={isDisabled ? 'secondary' : 'primary'}
                className={classNames(cls.PaymentButton)}
                onClick={submit}
            >
                {t('Оплатить')}
            </Button>
        </div>
    );
});
