import React, { useEffect } from 'react';
import { Button, Grid, Message } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import GameCardsCard from './GameCardsCard';
import { CardProps } from '../../types';
import { initCreate, clickCreate } from '../../actions/game';
import { StateType } from '../../reducers/game';

const PAIRS_COLS = 4;

const GameCards = ({ init, click, cards, win, previous }: any) => {
  const { t } = useTranslation();

  useEffect(() => {
    init();
  }, []);

  const handleCardClick = (card: CardProps) => {
    click(card, previous, cards);
  };

  if (win) {
    return (
      <>
        <Message positive>
          <Message.Header>{t('Congratulations')}</Message.Header>
          <p>{t('You won! Play again.')}</p>
        </Message>
        <Button primary onClick={init}>
          {t('Start new game')}
        </Button>
      </>
    );
  }

  return (
    <Grid doubling columns={PAIRS_COLS}>
      {cards.map((card: CardProps) => (
        <Grid.Column key={card.key}>
          <GameCardsCard card={card} onCardClick={handleCardClick} />
        </Grid.Column>
      ))}
    </Grid>
  );
};

const mapStateToProps = (state: StateType) => ({
  cards: state.cards,
  win: state.win,
  previous: state.previous,
});

const mapDispatchToProps = (dispatch: any) => ({
  init: () => dispatch(initCreate()),
  click: (card: CardProps) => dispatch(clickCreate(card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameCards);
