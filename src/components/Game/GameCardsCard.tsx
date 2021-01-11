import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { CardProps } from '../../types';

const StyledCard = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  &:after {
    content: ' ';
    display: block;
    width: 100%;
    padding-top: 100%;
  }
`;

const StyledAnimatedDiv = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  will-change: transform, opacity;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 150px;
  &.back {
    background: #ccc;
  }
`;

interface CardsCardProps {
  card: CardProps;
  onCardClick: (card: CardProps) => void;
}

export default function CardsCard({ card, onCardClick }: CardsCardProps) {
  const { isFaceUp, symbol } = card;

  const { transform, opacity } = useSpring({
    opacity: isFaceUp ? 1 : 0,
    transform: `perspective(600px) rotateX(${isFaceUp ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <StyledCard
      role="button"
      tabIndex={-10}
      onClick={() => onCardClick(card)}
      onKeyUp={() => onCardClick(card)}
    >
      <StyledAnimatedDiv
        className="back"
        style={{
          opacity: opacity.interpolate(o => 1 - Number(o)),
          transform,
        }}
      >
        <p> ? </p>
      </StyledAnimatedDiv>

      <StyledAnimatedDiv
        className="front"
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`),
        }}
      >
        <p> {symbol} </p>
      </StyledAnimatedDiv>
    </StyledCard>
  );
}
