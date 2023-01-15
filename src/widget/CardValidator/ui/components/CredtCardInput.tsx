import React, {
    createContext, memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from 'widget/CardWidget/ui/CardWidget.module.scss';
import { Card } from 'reactstrap';
import logoPayment from 'shared/assets/icon/ps_logos.png';
import { useTranslation } from 'react-i18next';
import MonthInput from 'widget/CardValidator/ui/components/MonthInput';
import YearInput from 'widget/CardValidator/ui/components/YearInpit';
import CVCInput from './CVCInput';
import CardNumberInput from './CardNumberInput';
import { CreditCard } from '../interfaces/card.interface';
import { CardContextInterface } from '../interfaces/helper.interfaces';
import { Props } from '../types/helper.types';
import '../style/cardStule.module.scss';

export const CreditCardDataContext = createContext<CardContextInterface | null>(null);

export const CardProvider = ({ children }: Props) => {
    const [cardData, setCardData] = useState<CreditCard | undefined>(undefined);

    const memoizedValue = useMemo(() => ({ cardData, setCardData }), [cardData, setCardData]);

    return (
        <CreditCardDataContext.Provider value={memoizedValue}>
            {children}
        </CreditCardDataContext.Provider>
    );
};

const CreditCardInput = memo(() => {
    const { t } = useTranslation();

    const [focusIndex, setFocusIndex] = useState<Array<boolean>>([]);
    const [cardData, setCardData] = useState<CreditCard | undefined>(undefined);

    const memoizedValue = useMemo(() => ({ cardData, setCardData }), [cardData, setCardData]);

    const leaveField = (index:number) => {
        const indexArray = new Array<boolean>(3).fill(false);
        indexArray[index] = true;
        setFocusIndex(indexArray);
    };

    const setFocusOnFirst = useCallback(
        () => {
            leaveField(0);
        },
        [],
    );

    useEffect(() => {
        leaveField(0);
    }, []);

    useEffect(() => {
        window.addEventListener('focus', setFocusOnFirst);
        return () => {
            window.removeEventListener('focus', setFocusOnFirst);
        };
    }, [setFocusOnFirst]);

    return (

        <CreditCardDataContext.Provider value={memoizedValue}>
            <div
                className={classNames(cls.cardAllBlock)}
            >
                <Card
                    className={classNames(cls.firstCard)}
                >
                    <div
                        className={classNames(cls.logoPayment)}
                    >
                        <img
                            src={logoPayment}
                            className={classNames(cls.imgLogo)}
                            alt={logoPayment}
                        />
                    </div>
                    <div
                        className={classNames(cls.cardInformation)}
                    >

                        <CardNumberInput
                            leaveFieldCallback={leaveField}
                            focus={focusIndex[0]}
                            tabIndex={0}
                        />

                        <div
                            className={classNames(cls.cardDataInfo)}
                        >
                            <MonthInput
                                leaveFieldCallback={leaveField}
                                focus={focusIndex[1]}
                                tabIndex={1}
                            />
                            <div
                                className={classNames(cls.cross)}
                            >
                                /
                            </div>
                            <YearInput
                                leaveFieldCallback={leaveField}
                                focus={focusIndex[2]}
                                tabIndex={2}
                            />

                        </div>

                    </div>
                </Card>
                <Card
                    className={classNames(cls.secCard)}
                >
                    <div
                        className={classNames(cls.cardInformationCvc)}
                    >
                        <CVCInput
                            focus={focusIndex[3]}
                            tabIndex={3}
                        />
                        <div
                            className={classNames(cls.textSec)}
                        >
                            {t('три цифры')}
                            <br />
                            {t('с обратной стороны карты')}
                        </div>
                    </div>
                </Card>
            </div>
        </CreditCardDataContext.Provider>
    );
});

export default CreditCardInput;
