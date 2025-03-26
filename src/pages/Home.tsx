// pages/Home.tsx
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

interface HomeProps {
  students?: Student[];
}

const guessGender = (name: string): 'male' | 'female' => {
  const lowerName = name.toLowerCase().trim();
  const maleEndings = ['o', 'el', 'io', 'im'];
  const femaleEndings = ['a', 'ia', 'ine', 'is'];
  const maleNames = ['joão', 'pedro', 'miguel', 'lucas', 'gabriel'];
  const femaleNames = ['maria', 'ana', 'julia', 'sofia', 'beatriz'];

  const firstName = lowerName.split(' ')[0];
  if (maleNames.includes(firstName)) return 'male';
  if (femaleNames.includes(firstName)) return 'female';
  if (maleEndings.some(ending => lowerName.endsWith(ending))) return 'male';
  if (femaleEndings.some(ending => lowerName.endsWith(ending))) return 'female';
  return 'male';
};

const HomeContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.large} ${({ theme }) => theme.spacing.medium};
  padding-top: 60px; /* Keeps title higher as requested */
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

const TopStudentSection = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.medium};

  h2 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.8rem;
    margin-bottom: ${({ theme }) => theme.spacing.medium};
    font-weight: 600;
  }
`;

const TopStudentCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  padding: ${({ theme }) => theme.spacing.medium};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  width: 300px;
  margin: 0 auto;
  border: 2px solid ${({ theme }) => theme.colors.primary};
`;

const TopStudentAvatar = styled.span`
  font-size: 3rem;
`;

const TopStudentName = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const Home: React.FC<HomeProps> = ({ students = [] }) => {
  const rankedStudents = [...students]
    .map(student => {
      const totalScore = Object.values(student.grades).reduce((sum, grade) => sum + grade, 0);
      return { ...student, totalScore };
    })
    .sort((a, b) => b.totalScore - a.totalScore);

  const topStudent = rankedStudents[0];

  return (
    <HomeContainer>
      <HeaderSection>
        <h1>Bem-vindo ao Ranking Escolar</h1>
        <p>Esta é a página inicial.</p>
      </HeaderSection>
      {topStudent && (
        <TopStudentSection>
          <h2>Primeiro Lugar</h2>
          <TopStudentCard>
            <TopStudentAvatar>
              {guessGender(topStudent.name) === 'male' ? '👨' : '👩'}
            </TopStudentAvatar>
            <TopStudentName>{topStudent.name}</TopStudentName>
          </TopStudentCard>
        </TopStudentSection>
      )}
    </HomeContainer>
  );
};

export default Home;