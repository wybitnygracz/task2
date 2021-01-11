import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Header,
  Button,
  ButtonProps,
} from 'semantic-ui-react';

interface GameStartProps {
  handleStartGame: () => void;
}

export default function GameStart({ handleStartGame }: GameStartProps) {
  const { t } = useTranslation();
  const handleStart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps,
  ) => {
    event.preventDefault();
    handleStartGame();
  };

  return (
    <Container text>
      <Header as="h3">{t('Game rules')}</Header>
      <p>{t('Please find matching pars.')}</p>
      <Button primary onClick={handleStart}>
        {t('Start new game.')}
      </Button>
    </Container>
  );
}
