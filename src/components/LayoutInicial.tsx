// src/components/LayoutInicial.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.medium};
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  font-weight: 600;
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const LayoutInicial: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Container>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/ranking">Ranking</NavLink>
        <NavLink to="/cadastro">Cadastrar Aluno</NavLink>
      </Nav>
      {children}
    </Container>
  );
};

export default LayoutInicial;