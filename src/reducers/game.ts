import { CardProps } from '../types';

type ActionType =
  | { type: 'SET_CARDS'; cards: Array<CardProps> }
  | { type: 'SET_WIN'; win: boolean }
  | { type: 'SET_PREVIOUS'; previous: CardProps | null };

export type StateType = {
  cards: Array<CardProps>;
  win: boolean;
  previous: CardProps | null;
};

export const initialState: StateType = {
  cards: [],
  win: false,
  previous: null,
};

export function cardsReducer(state = initialState, action: ActionType) {
  switch (action.type) {
    case 'SET_CARDS': {
      return { ...state, cards: action.cards };
      break;
    }
    case 'SET_WIN': {
      return { ...state, win: action.win };
      break;
    }
    case 'SET_PREVIOUS': {
      return { ...state, previous: action.previous };
    }
    default: {
      return state;
    }
  }
}
