import React, {
    useContext, useEffect, useRef, useState,
} from 'react';
import { TextField } from '@material-ui/core';
import InputMask from 'react-input-mask';

import { number } from 'card-validator';
import { CardNumberVerification } from 'card-validator/dist/card-number';

import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { cardActions } from 'entities/Card';
import { InputProps } from '../types/helper.types';
import { CreditCardDataContext } from './CredtCardInput';
import { absLenght } from '../helpers/converters';
import cls from '../style/cardStule.module.scss';

// TODO: still not proper valid at last char if number is not valid

const CardNumberInput = ({ leaveFieldCallback, focus, tabIndex }:InputProps) => {
    const [error, setError] = useState(false);
    const [info, setInfo] = useState('');
    const inputRef = useRef<HTMLInputElement>(null!);
    const dispatch = useAppDispatch();

    const CardContext = useContext(CreditCardDataContext);

    const handleChange = (event:any) => {
        const cardNumberValue:string = event?.target?.value;
        const cardNumberValidator:CardNumberVerification = number(cardNumberValue);

        if (absLenght(cardNumberValue) > 0 && !cardNumberValidator.isPotentiallyValid) {
            setError(true);
            setInfo('Номер карты не действителен');
            dispatch(cardActions.setError(true));
        // TODO: is not good
            // } else if (/([0-9]{4,})/.test(cardNumberValue) && !cardNumberValidator.isValid) {
            //   setError(true);
            //   setInfo("still something sticky");
        } else if (!/([0-9]+)/.test(cardNumberValue)) {
            setError(false);
            setInfo('');
        } else if (cardNumberValidator.isValid) {
            setError(false);
            setInfo('');
            if (leaveFieldCallback) {
                leaveFieldCallback(tabIndex + 1);
            }
            dispatch(cardActions.setError(false));
            dispatch(cardActions.setPan(cardNumberValue.replace(/[^0-9]/g, '')));
        }
    };

    const handleBlur = (event:any) => {
        const cardNumberValue = event?.target?.value;
        const cardNumberValidator:CardNumberVerification = number(cardNumberValue);
        if (cardNumberValidator.isValid) {
            setError(false);
            dispatch(cardActions.setError(false));
            setInfo('');
            CardContext?.setCardData({
                ...CardContext.cardData,
                cardNumber: event?.target?.value || '',
                cvclenght: cardNumberValidator?.card?.code.size || 3,
            });
        } else {
            dispatch(cardActions.setError(true));
            setError(true);
            setInfo('Проверьте номер карты');
            if (leaveFieldCallback) {
                leaveFieldCallback(tabIndex);
            }
        }
    };

    useEffect(() => {
        if (focus) {
            inputRef.current.focus();
        }
    }, [focus]);

    return (
        <InputMask
            mask="9999 9999 9999 9999"
            maskChar=" "
            onChange={handleChange}
            onBlur={handleBlur}
        >
            {() => (
                <TextField
                    error={error}
                    id="standard-error-helper-text"
                    label="Номер карты"
                    tabIndex={tabIndex}
                    autoFocus={focus}
                    helperText={info}
                    inputRef={inputRef}
                    className={classNames(cls.inputNumber)}
                />

            )}
        </InputMask>
    );
};

export default CardNumberInput;
