import React, {
    useContext, useEffect, useRef, useState,
} from 'react';
import { TextField } from '@material-ui/core';
import InputMask from 'react-input-mask';
import { expirationDate, expirationMonth, expirationYear } from 'card-validator';
import { ExpirationDateVerification } from 'card-validator/dist/expiration-date';
import { ExpirationMonthVerification } from 'card-validator/dist/expiration-month';
import { ExpirationYearVerification } from 'card-validator/dist/expiration-year';
import { InputProps } from '../types/helper.types';
import { CreditCardDataContext } from './CredtCardInput';
import { absLenght } from '../helpers/converters';

const DateInput = ({ leaveFieldCallback, focus, tabIndex }:InputProps) => {
    const [error, setError] = useState(false);
    const [info, setInfo] = useState('');
    const inputRef = useRef<HTMLInputElement>(null!);

    const CardContext = useContext(CreditCardDataContext);

    const handleChange = (event:any) => {
        const value:any = event?.target?.value;
        const epirationDate:ExpirationDateVerification = expirationDate(value);
        const epirationMonth:ExpirationMonthVerification = expirationMonth(value);
        const epirationYear:ExpirationYearVerification = expirationYear(value);
        const DateLength = absLenght(value);

        console.log(DateLength);

        if (DateLength > 0 && !epirationMonth.isPotentiallyValid) {
            setInfo('Wrong month data');
            setError(true);
        } else if (DateLength > 0 && !epirationYear.isPotentiallyValid) {
            setInfo('Wrong year data');
            setError(true);
        } else if (DateLength > 0 && !epirationDate.isValid) {
            setInfo('Wrong data');
            setError(true);
        } else {
            setInfo('');
            setError(false);
        }
        if (epirationDate.isValid) {
            if (leaveFieldCallback) {
                leaveFieldCallback(tabIndex + 1);
            }
        }
    };

    const handleBlur = (event:any) => {
        const value:any = event?.target?.value;
        const epirationDate:ExpirationDateVerification = expirationDate(value);
        if (epirationDate.isValid) {
            setError(false);
            setInfo('');
            CardContext?.setCardData({
                ...CardContext.cardData,
                date: {
                    moth: epirationDate.month,
                    year: epirationDate.year,
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
            mask="99 / 99"
            maskChar=" "
            onChange={handleChange}
            onBlur={handleBlur}
            tabIndex={tabIndex}
        >
            {() => (
                <TextField
                    name="expire"
                    label="expire date"
                    type="text"
                    error={error}
                    helperText={info}
                    autoFocus={focus}
                    required
                    inputRef={inputRef}
                />
            )}
        </InputMask>
    );
};

export default DateInput;
