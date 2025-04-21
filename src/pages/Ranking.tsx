import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Student, Suggestion } from '../types';

interface RankingProps {
  students: Student[];
  addEffortPoints: (id: number, points: number) => void;
  suggestions: Suggestion[];
  setSuggestions: React.Dispatch<React.SetStateAction<Suggestion[]>>;
  apiKey: string;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
  approveSuggestion: (id: number) => void;
  rejectSuggestion: (id: number) => void;
}

function calculateRanking(students: Student[]) {
  try {
    return students
      .map(student => {
        const grades = Object.values(student.grades);
        if (!grades.length) throw new Error('Sem notas para o aluno');
        const totalScore = grades.reduce((sum, grade) => sum + grade, 0);
        const avgGrade = totalScore / grades.length;
        const finalScore = totalScore + student.effortPoints;
        return { ...student, totalScore, avgGrade, finalScore };
      })
      .sort((a, b) => b.finalScore - a.finalScore);
  } catch (error) {
    console.error('Erro em calculateRanking:', error);
    return students;
  }
}

function getMockSuggestions(code: string): Suggestion[] {
  return [
    { id: 1, type: 'improvement', description: 'Separar cálculo da média em uma função nova.', status: 'pending' },
    { id: 2, type: 'improvement', description: 'Validar notas para evitar valores nulos.', status: 'pending' },
    { id: 3, type: 'new_feature', description: 'Adicionar botão para exportar ranking em CSV.', status: 'pending' },
  ];
}

async function fetchAISuggestions(code: string, apiKey: string): Promise<Suggestion[]> {
  try {
    if (!apiKey) {
      console.log('Sem chave de API, usando resposta mock em Português');
      return getMockSuggestions(code);
    }
    const response = await fetch('http://localhost:3000/proxy/grok', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: `Analise esta função JavaScript e sugira 2-3 melhorias ou novas funcionalidades para um app de ranking de alunos. Responda em Português, com sugestões simples e diretas, no formato JSON: [{id, type, description, status}].\n\n${code}`,
        max_tokens: 500,
      }),
    });
    if (!response.ok) throw new Error(`Erro na requisição ao proxy: ${response.status}`);
    const data = await response.json();
    return data.suggestions || getMockSuggestions(code);
  } catch (error) {
    console.error('Erro ao buscar sugestões da IA:', error);
    return getMockSuggestions(code);
  }
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
  margin-bottom: ${({ theme }) => theme.spacing.large};
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
    border-bottom: 1px solid ${({ theme }) => theme.colors.secondary}20;
  }

  th {
    background: ${({ theme }) => theme.colors.primary}20;
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
    background: ${({ theme }) => theme.colors.primary}10;
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

const EffortButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}80;
  }
`;

const SuggestionsSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: ${({ theme }) => theme.spacing.large};
`;

const SuggestionsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const SuggestionItem = styled.div<{ status: string }>`
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ status, theme }) =>
    status === 'approved' ? `${theme.colors.success}20` : `${theme.colors.warning}20`};
  border-radius: 4px;
  margin-bottom: ${({ theme }) => theme.spacing.small};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SuggestionText = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const SuggestionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
`;

const ApproveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.success}80;
  }
`;

const RejectButton = styled.button`
  background-color: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.error}80;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.secondary}50;
  border-radius: 4px;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.text};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Ranking: React.FC<RankingProps> = ({
  students,
  addEffortPoints,
  suggestions,
  setSuggestions,
  apiKey,
  setApiKey,
  approveSuggestion,
  rejectSuggestion,
}) => {
  const [error, setError] = React.useState<string | null>(null);
  const rankedStudents = calculateRanking(students);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const code = calculateRanking.toString();
        const newSuggestions = await fetchAISuggestions(code, apiKey);
        setSuggestions(prev => [
          ...prev,
          ...newSuggestions
            .filter(s => !prev.some(p => p.id === s.id))
            .map(s => ({ ...s, id: prev.length + s.id })),
        ]);
        setError(null);
      } catch (err) {
        setError('Falha ao buscar sugestões. Usando dados mock.');
        console.error(err);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [apiKey, setSuggestions]);

  return (
    <RankingContainer>
      <HeaderSection>
        <h1>Ranking de Alunos</h1>
        <p>Aqui está o ranking dos alunos baseado nas notas e pontos de esforço.</p>
      </HeaderSection>
      <div style={{ width: '100%', maxWidth: '800px', marginBottom: '1rem' }}>
        <Label>Chave da API xAI (opcional)</Label>
        <Input
          type="text"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          placeholder="Insira a chave da xAI para usar a API real"
        />
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
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
              <th>Esforço</th>
              <th>Total</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {rankedStudents.length === 0 ? (
              <tr>
                <td colSpan={12}>Nenhum aluno cadastrado.</td>
              </tr>
            ) : (
              rankedStudents.map((student, index) => (
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
                  <td>{student.effortPoints}</td>
                  <td>{student.finalScore.toFixed(1)}</td>
                  <td>
                    <EffortButton onClick={() => addEffortPoints(student.id, 10)}>+10 Esforço</EffortButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </RankingTable>
      </TableWrapper>
      <SuggestionsSection>
        <SuggestionsTitle>🤖 Sugestões da IA</SuggestionsTitle>
        {suggestions.length === 0 ? (
          <p>Aguardando sugestões...</p>
        ) : (
          suggestions.map(suggestion => (
            <SuggestionItem key={suggestion.id} status={suggestion.status}>
              <SuggestionText>
                <strong>{suggestion.type === 'improvement' ? 'Melhoria' : 'Nova Funcionalidade'}</strong>: {suggestion.description}
                <br />
                <small>Status: {suggestion.status === 'approved' ? 'Aprovado' : 'Pendente'}</small>
              </SuggestionText>
              {suggestion.status === 'pending' && (
                <SuggestionButtons>
                  <ApproveButton onClick={() => approveSuggestion(suggestion.id)}>Aprovar</ApproveButton>
                  <RejectButton onClick={() => rejectSuggestion(suggestion.id)}>Rejeitar</RejectButton>
                </SuggestionButtons>
              )}
            </SuggestionItem>
          ))
        )}
      </SuggestionsSection>
    </RankingContainer>
  );
};

export default Ranking;