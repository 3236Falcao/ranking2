import React from 'react';
import { Student } from '../types';

interface HomeProps {
  students: Student[];
}

const Home: React.FC<HomeProps> = ({ students }) => {
  return (
    <div>
      <h1>Bem-vindo ao Ranking de Alunos</h1>
      <p>Total de alunos cadastrados: {students.length}</p>
    </div>
  );
};

export default Home;