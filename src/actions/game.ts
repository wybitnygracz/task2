import { Dispatch } from 'redux';
import { setIn, fromJS } from 'immutable';
import { CardProps } from '../types';
import { StateType } from '../reducers/game';

export function setCards(cards: Array<CardProps>) {
  return {
    type: 'SET_CARDS',
    cards,
  };
}

export function setPrevious(card: CardProps | null) {
  return {
    type: 'SET_PREVIOUS',
    previous: card,
  };
}

export function setWin(win: boolean) {
  return {
    type: 'SET_WIN',
    win,
  };
}

export function initCreate() {
  const symbols = [...'abcdefghijklmnopqrstuvwxyz'];
  const pairsCount = 36;

  let shuffledSymbols = symbols.sort(() => 0.5 - Math.random());
  shuffledSymbols = shuffledSymbols.slice(0, pairsCount);

  const cards = [] as Array<CardProps>;
  for (let i = 0; i < pairsCount; i += 1) {
    cards.push({
      matched: false,
      key: `a${i}`,
      isFaceUp: false,
      symbol: shuffledSymbols[i],
    });
    cards.push({
      matched: false,
      key: `b${i}`,
      isFaceUp: false,
      symbol: shuffledSymbols[i],
    });
  }

  cards.sort(() => 0.5 - Math.random());

  return (dispatch: Dispatch) => {
    dispatch(setWin(false));
    dispatch(setPrevious(null));
    dispatch(setCards(cards));
  };
}

export function clickCreate(card: CardProps) {
  return (dispatch: Dispatch, getState: () => StateType) => {
    const { cards, previous } = getState();

    const index = cards.indexOf(card);

    if (cards[index].isFaceUp) {
      return;
    }

    let newCards = setIn(fromJS(cards), [index, 'isFaceUp'], true);

    if (!previous) {
      dispatch(setCards(newCards.toJS()));
      dispatch(setPrevious(card));
      return;
    }

    const faceUpNotMatchedIndexes = [] as Array<number>;

    let allFaceUp = 0;
    newCards.toJS().forEach((el: CardProps, index: number) => {
      if (el.isFaceUp) {
        allFaceUp += 1;
      }
      if (
        (el.key === card.key || el.key === previous.key) &&
        el.isFaceUp &&
        !el.matched
      ) {
        faceUpNotMatchedIndexes.push(index);
      }
    });

    if (allFaceUp % 2 !== 0) {
      dispatch(setCards(newCards.toJS()));
      dispatch(setPrevious(card));
      return;
    }

    if (card.symbol === previous.symbol) {
      newCards = setIn(newCards, [faceUpNotMatchedIndexes[0], 'matched'], true);
      newCards = setIn(newCards, [faceUpNotMatchedIndexes[1], 'matched'], true);
      dispatch(setCards(newCards.toJS()));
      dispatch(setPrevious(card));

      if (
        newCards
          .toJS()
          .reduce(
            (count: number, el: CardProps) => count + Number(!el.matched),
            0,
          ) === 0
      ) {
        setTimeout(() => dispatch(setWin(true)), 1000);
      }
    } else {
      dispatch(setCards(newCards.toJS()));
      dispatch(setPrevious(card));
      setTimeout(() => {
        const { cards } = getState();
        let newCards = fromJS(cards);

        newCards = setIn(
          newCards,
          [faceUpNotMatchedIndexes[0], 'isFaceUp'],
          false,
        );
        newCards = setIn(
          newCards,
          [faceUpNotMatchedIndexes[1], 'isFaceUp'],
          false,
        );
        dispatch(setCards(newCards.toJS()));
      }, 1000);
    }
  };
}
