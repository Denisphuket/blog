import React, {
    useContext, useEffect, useRef, useState,
} from 'react';
import { TextField } from '@material-ui/core';
import InputMask from 'react-input-mask';
import { expirationYear } from 'card-validator';
import { ExpirationYearVerification } from 'card-validator/dist/expiration-year';
import { classNames } from 'shared/lib/classNames/classNames';
import { cardActions } from 'entities/Card';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { InputProps } from '../types/helper.types';
import { CreditCardDataContext } from './CredtCardInput';
import { absLenght } from '../helpers/converters';
import cls from '../style/cardStule.module.scss';

const YearInput = ({ leaveFieldCallback, focus, tabIndex }:InputProps) => {
    const [error, setError] = useState(false);
    const [info, setInfo] = useState('');
    const inputRef = useRef<HTMLInputElement>(null!);
    const dispatch = useAppDispatch();

    const CardContext = useContext(CreditCardDataContext);

    const handleChange = (event:any) => {
        const value:any = event?.target?.value;
        const epirationYear:ExpirationYearVerification = expirationYear(value);
        const DateLength = absLenght(value);

        if (DateLength > 0 && !epirationYear.isPotentiallyValid) {
            dispatch(cardActions.setError(true));
            setInfo('Ошибка');
            setError(true);
        } else {
            setInfo('');
            setError(false);
        }
        if (epirationYear.isValid) {
            if (leaveFieldCallback) {
                leaveFieldCallback(tabIndex + 1);
            }
            dispatch(cardActions.setError(false));
            dispatch(cardActions.setYear(parseInt('20'.concat(value), 10)));
        }
    };

    const handleBlur = (event:any) => {
        const value:any = event?.target?.value;
        const epirationYear:ExpirationYearVerification = expirationYear(value);
        if (epirationYear.isValid) {
            setError(false);
            setInfo('');
            CardContext?.setCardData({
                ...CardContext.cardData,
                date: {
                    year: epirationYear,
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
                    label="Год"
                    type="text"
                    error={error}
                    helperText={info}
                    autoFocus={focus}
                    required
                    inputRef={inputRef}
                    className={classNames(cls.inputYear)}
                />
            )}
        </InputMask>
    );
};

export default YearInput;
