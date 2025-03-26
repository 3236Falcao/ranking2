// pages/Ranking.tsx
import styled from 'styled-components';

interface Grade {
  portugues: number;
  matematica: number;
  historia: number;
  ciencias: number;
  geografia: number;
  ensinoReligioso: number;
}

interface Student {
  id: number;
  name: string;
  class: string;
  grades: Grade;
}

interface RankingProps {
  students?: Student[];
}

const RankingContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.large} ${({ theme }) => theme.spacing.medium};
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  width: 100%;
  max-width: 800px;

  h1 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 2.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.medium};
    font-weight: 700;
  }

  p {
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 1.2rem;
    margin: 0;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  width: 100%;
  max-width: 1200px;
`;

const RankingTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  th,
  td {
    padding: ${({ theme }) => theme.spacing.large};
    text-align: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.secondary}20; /* 20% opacity */
  }

  th {
    background: ${({ theme }) => theme.colors.primary}20; /* 20% opacity */
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.95rem;
    letter-spacing: 0.05em;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:nth-child(even) {
    background: ${({ theme }) => theme.colors.background};
  }

  tr:hover {
    background: ${({ theme }) => theme.colors.primary}10; /* 10% opacity */
    transition: background 0.2s ease;
  }

  td:first-child {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    width: 80px;
  }

  td:nth-child(2) {
    text-align: left;
    width: 250px;
  }

  td:last-child {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    width: 100px;
  }

  td {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Ranking: React.FC<RankingProps> = ({ students = [] }) => {
  const rankedStudents = [...students]
    .map(student => {
      const totalScore = Object.values(student.grades).reduce((sum, grade) => sum + grade, 0);
      return { ...student, totalScore };
    })
    .sort((a, b) => b.totalScore - a.totalScore);

  return (
    <RankingContainer>
      <HeaderSection>
        <h1>Ranking de Alunos</h1>
        <p>Aqui está o ranking dos alunos baseado nas notas das disciplinas.</p>
      </HeaderSection>
      <TableWrapper>
        <RankingTable>
          <thead>
            <tr>
              <th>Posição</th>
              <th>Nome</th>
              <th>Turma</th>
              <th>Português</th>
              <th>Matemática</th>
              <th>História</th>
              <th>Ciências</th>
              <th>Geografia</th>
              <th>Ens. Religioso</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {rankedStudents.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.grades.portugues.toFixed(1)}</td>
                <td>{student.grades.matematica.toFixed(1)}</td>
                <td>{student.grades.historia.toFixed(1)}</td>
                <td>{student.grades.ciencias.toFixed(1)}</td>
                <td>{student.grades.geografia.toFixed(1)}</td>
                <td>{student.grades.ensinoReligioso.toFixed(1)}</td>
                <td>{student.totalScore.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </RankingTable>
      </TableWrapper>
    </RankingContainer>
  );
};

export default Ranking;