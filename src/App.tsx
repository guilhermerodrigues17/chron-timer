import { Heading } from './components/Heading';
import { Container } from './components/Container';

import './styles/global.css';
import './styles/theme.css';

export function App() {
  return (
    <>
      <Container>
        <Heading>Logo</Heading>
      </Container>

      <Container>
        <Heading>Menu</Heading>
      </Container>
    </>
  );
}
