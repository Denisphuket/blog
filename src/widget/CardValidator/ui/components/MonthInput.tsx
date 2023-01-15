import React, {
    useContext, useEffect, useRef, useState,
} from 'react';
import { TextField } from '@material-ui/core';
import InputMask from 'react-input-mask';
import { expirationMonth } from 'card-validator';
import { ExpirationMonthVerification } from 'card-validator/dist/expiration-month';
import { classNames } from 'shared/lib/classNames/classNames';
import { cardActions } from 'entities/Card';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { InputProps } from '../types/helper.types';
import { CreditCardDataContext } from './CredtCardInput';
import { absLenght } from '../helpers/converters';
import cls from '../style/cardStule.module.scss';

const MonthInput = ({ leaveFieldCallback, focus, tabIndex }:InputProps) => {
    const [error, setError] = useState(false);
    const [info, setInfo] = useState('');
    const inputRef = useRef<HTMLInputElement>(null!);
    const dispatch = useAppDispatch();

    const CardContext = useContext(CreditCardDataContext);

    const handleChange = (event:any) => {
        const value:any = event?.target?.value;
        const epirationMonth:ExpirationMonthVerification = expirationMonth(value);
        const DateLength = absLenght(value);

        console.log(DateLength);

        if (DateLength > 0 && !epirationMonth.isPotentiallyValid) {
            dispatch(cardActions.setError(true));
            setInfo('Ошибка');
            setError(true);
        } else {
            setInfo('');
            setError(false);
        }
        if (epirationMonth.isValid) {
            if (leaveFieldCallback) {
                leaveFieldCallback(tabIndex + 1);
            }
            dispatch(cardActions.setError(false));
            dispatch(cardActions.setMonth(parseInt(value, 10)));
        }
    };

    const handleBlur = (event:any) => {
        const value:any = event?.target?.value;
        const epirationMonth:ExpirationMonthVerification = expirationMonth(value);
        if (epirationMonth.isValid) {
            setError(false);
            setInfo('');
            CardContext?.setCardData({
                ...CardContext.cardData,
                date: {
                    moth: epirationMonth,
                },
            });
        } else {
            setError(true);
        }
    };

    useEffect(() => {
        if (focus) {
            inputRef.current.focus();
        }
    }, [focus]);

    return (
        <InputMask
            mask="99"
            maskChar=" "
            onChange={handleChange}
            onBlur={handleBlur}
            tabIndex={tabIndex}
        >
            {() => (
                <TextField
                    name="expire"
                    label="Месяц"
                    type="text"
                    error={error}
                    helperText={info}
                    autoFocus={focus}
                    required
                    inputRef={inputRef}
                    className={classNames(cls.inputMonth)}
                />
            )}
        </InputMask>
    );
};

export default MonthInput;
