import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Container, Header } from 'semantic-ui-react';
import GameStart from '../components/Game/GameStart';
import GameCards from '../components/Game/GameCards';

const ContainerHader = styled(Container)({
  padding: '20px',
});

const ContainerFooter = styled(Container)({
  padding: '20px',
  textAlign: 'center',
});

export default function Game() {
  const { t } = useTranslation();
  const [start, setStart] = useState(false);

  return (
    <>
      <ContainerHader text as="header">
        <Header textAlign="center" as="h1">
          {t('Memo Game - train your memory')}
        </Header>
      </ContainerHader>
      <Container as="main">
        {start ? (
          <GameCards />
        ) : (
          <GameStart handleStartGame={() => setStart(true)} />
        )}
      </Container>
      <ContainerFooter as="footer">
        {t('© Memo Game - train your memory')}
      </ContainerFooter>
    </>
  );
}
