import React, { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import footerLogoPayment from 'shared/assets/icon/footer_logos.fcbe63b.png';
import { ServerResponse } from 'features/GetOrderDetailByNumber';
import CreditCardInput from 'widget/CardValidator/ui/components/CredtCardInput';
import { PaymentButton } from 'shared/ui/PaymentButton/PaymentButton';
import cls from './CardWidget.module.scss';

interface CardWidgetProps {
    orderDetail: ServerResponse;
    className?: string;
}
export const CardWidget = memo((props: CardWidgetProps) => {
    const {
        className, orderDetail,
    } = props;

    const { t } = useTranslation();

    return (

        <div className={classNames(cls.CardWidget, {}, [className])}>

            <div>
                <div
                    className={classNames(cls.cardBlock)}
                >
                    <div
                        className={classNames(cls.oderInformation)}
                    >
                        <div
                            className={classNames(cls.textInfo)}
                        >
                            {t('Оплата заказа:')}
                        </div>

                        {
                            orderDetail.items.map((el) => (
                                <div
                                    className={classNames(cls.receiptProduct)}
                                    key={el.name}
                                >
                                    <div
                                        className={classNames(cls.textProductName)}
                                        key={el.name}
                                    >
                                        {el.name.substring(0, 30)}
                                    </div>
                                    <div
                                        className={classNames(cls.textProductQuantity)}
                                        key={el.quantity}
                                    >
                                        {`${el.quantity} ${t('шт.')}`}
                                    </div>
                                    <div
                                        className={classNames(cls.textProductSum)}
                                        key={el.sum}
                                    >
                                        {el.sum.slice(0, -3)}
                                        {' '}
                                        {t('руб.')}
                                    </div>
                                </div>
                            ))
                        }
                        <div
                            className={classNames(cls.fullSumBox)}
                        >
                            <div>
                                _______________________
                            </div>
                            <div>
                                {
                                    `${t('Итого к оплате: ')}
                                    ${orderDetail.sum.slice(0, -3)}
                                    ${t('руб.')}`
                                }
                            </div>
                        </div>
                    </div>

                    <div
                        className={classNames(cls.cardAllBlock)}
                    >
                        <CreditCardInput />

                        <PaymentButton order={orderDetail.order} />

                        <div
                            className={classNames(cls.footerLogo)}
                        >
                            <img
                                className={classNames(cls.footerLogoPayment)}
                                src={footerLogoPayment}
                                alt="footerLogo"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
});
export default CardWidget;
