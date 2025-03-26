// components/LayoutInicial.tsx
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface LayoutInicialProps {
  children?: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  padding: ${(props) => props.theme.spacing.medium};
  text-align: center;
`;

const Nav = styled.nav`
  margin-top: ${(props) => props.theme.spacing.small};
  a {
    color: ${(props) => props.theme.colors.white};
    margin: 0 ${(props) => props.theme.spacing.small};
    text-decoration: none;
    font-size: 1.1rem;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Main = styled.main`
  flex: 1;
  /* No padding here; pages handle their own */
`;

const Footer = styled.footer`
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.medium};
  text-align: center;
  color: ${(props) => props.theme.colors.text};
`;

const LayoutInicial: React.FC<LayoutInicialProps> = ({ children }) => {
  return (
    <Container>
      <Header>
        Ranking Escolar
        <Nav>
          <Link to="/">Home</Link>
          <Link to="/ranking">Ranking</Link>
        </Nav>
      </Header>
      <Main>{children}</Main>
      <Footer>Footer</Footer>
    </Container>
  );
};

export default LayoutInicial;