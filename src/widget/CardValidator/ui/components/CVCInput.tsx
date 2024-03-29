import React, {
    useState, useRef, useEffect, useContext,
} from 'react';
import { TextField } from '@material-ui/core';
import InputMask from 'react-input-mask';
import { cvv } from 'card-validator';
import { Verification } from 'card-validator/dist/types';
import { classNames } from 'shared/lib/classNames/classNames';
import { cardActions } from 'entities/Card';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { InputProps } from '../types/helper.types';
import { CreditCardDataContext } from './CredtCardInput';
import { absLenght } from '../helpers/converters';
import cls from '../style/cardStule.module.scss';

interface CVCInputProps extends InputProps { }

// TODO: chnange to props
const CVCInput = (props:CVCInputProps) => {
    const {
        leaveFieldCallback,
        focus,
        tabIndex,
    } = props;

    const [error, setError] = useState(false);
    const [info, setInfo] = useState('');
    const dispatch = useAppDispatch();

    const CardContext = useContext(CreditCardDataContext);
    const inputRef = useRef<HTMLInputElement>(null!);
    const CVCLengthRequired = CardContext?.cardData?.cvclenght;

    const handleChange = (event:any) => {
        const CVCLength = absLenght(inputRef?.current.value);
        const CVCverify:Verification = cvv(event?.target?.value);

        if (CVCLength > 0 && CVCLength !== CVCLengthRequired) {
            setError(true);
            dispatch(cardActions.setError(true));
            setInfo('Не корректная длина CVC');
        } else if (CVCLength > 0 && !CVCverify.isPotentiallyValid) {
            setError(true);
            setInfo('Не может быть пустым');
            dispatch(cardActions.setError(true));
        } else if (CVCverify.isValid) {
            setError(false);
            setInfo('');
            if (leaveFieldCallback) {
                leaveFieldCallback(tabIndex + 1);
            }
            dispatch(cardActions.setError(false));
            dispatch(cardActions.setCvc(parseInt(event?.target?.value, 10)));
        }
    };

    const handleBlur = (event:any) => {
        const CVCvalue = event?.target?.value;
        const CVCLength = absLenght(CVCvalue);
        const value:Verification = cvv(CVCvalue);
        if (CVCLength > 0 && value.isValid) {
            dispatch(cardActions.setError(false));
            setError(false);
            setInfo('');
            CardContext?.setCardData({
                ...CardContext.cardData,
                cvc: CVCvalue,
            });
        } else {
            // TODO: could rmove - its redundand
            dispatch(cardActions.setError(true));
            setError(true);
            setInfo('Ошибка CVC');
        }
    };

    useEffect(() => {
        if (focus) {
            inputRef.current.focus();
        }
    }, [focus]);
    // TODO: props cvc count i mask na to ustawić
    return (
        <InputMask
            mask="999"
            maskChar=" "
            onChange={handleChange}
            onBlur={handleBlur}
        >
            {() => (
                <TextField
                    name="cvc"
                    label="CVC"
                    type="text"
                    error={error}
                    placeholder="XXX"
                    tabIndex={tabIndex}
                    required
                    helperText={info}
                    autoFocus={focus}
                    inputRef={inputRef}
                    className={classNames(cls.cvcInput)}
                />
            )}
        </InputMask>
    );
};

export default CVCInput;
