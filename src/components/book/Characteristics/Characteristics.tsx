'use client';

import { useEffect, useState } from 'react';

import {
    CharContainer,
    CharItem,
    CharKey,
    CharList,
    CharValue,
    ControlButton,
    ControlButtons,
    Description,
    FullButton,
    FullIcon,
    Title,
} from './Characteristics.styles';
import { ICharacteristics } from './Characteristics.types';

const Characteristics: React.FC<{ characteristics: ICharacteristics }> = ({
    characteristics = null,
}) => {
    const [isFull, setIsFull] = useState(false);
    const [isDescFull, setIsDescFull] = useState(false);
    useEffect(() => {
        if (isDescFull == true) {
            document.querySelector('.description')?.classList.add('full');
            document.querySelector('.full_icon')?.classList.add('full');
        } else {
            document.querySelector('.description')?.classList.remove('full');
            document.querySelector('.full_icon')?.classList.remove('full');
        }
    }, [isDescFull]);
    useEffect(() => {
        if (isFull == true) {
            document.querySelector('.full_icon_char')?.classList.add('full');
        } else {
            document.querySelector('.full_icon_char')?.classList.remove('full');
        }
    }, [isFull]);

    return (
        <CharContainer>
            <Title>Характеристики</Title>
            <CharList>
                <CharItem>
                    <CharKey>Мова:</CharKey>
                    <CharValue>
                        {characteristics?.language === 'ukr'
                            ? 'Українська'
                            : characteristics?.language}
                    </CharValue>
                </CharItem>
                <CharItem>
                    <CharKey>Видавництво:</CharKey>
                    <CharValue>{characteristics?.publish}</CharValue>
                </CharItem>
                <CharItem>
                    <CharKey>Кількість сторінок:</CharKey>
                    <CharValue>{characteristics?.pages}</CharValue>
                </CharItem>
                {isFull && (
                    <CharItem>
                        <CharKey>Обкладинка:</CharKey>
                        <CharValue>
                            Тут будут жанры в ближайшем будущем
                        </CharValue>
                    </CharItem>
                )}
                <FullButton
                    onClick={() => {
                        setIsFull(prev => !prev);
                    }}
                >
                    {isFull ? 'Сховати ' : 'Показати '}
                    всі характеристики{' '}
                    <FullIcon className="full_icon_char" name="arrow_down" />
                </FullButton>
            </CharList>
            <Title>Опис</Title>
            <ControlButtons>
                <ControlButton className="active mobile">Сюжет</ControlButton>
                <ControlButton className="mobile disabled ">
                    Читати уривок
                </ControlButton>
                <ControlButton className="quote disabled ">
                    Цитати з книги
                </ControlButton>
            </ControlButtons>
            <Description
                className="description"
                dangerouslySetInnerHTML={{
                    __html: characteristics?.description || '',
                }}
            ></Description>
            <FullButton
                onClick={() => {
                    setIsDescFull(prev => !prev);
                }}
            >
                {isDescFull ? 'Сховати ' : 'Показати '}
                повний опис
                <FullIcon className="full_icon" name="arrow_down" />
            </FullButton>
        </CharContainer>
    );
};

export default Characteristics;
