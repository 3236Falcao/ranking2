// App.tsx
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './styles/theme';
import LayoutInicial from './components/LayoutInicial';
import Home from './pages/Home';
import Ranking from './pages/Ranking';

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

function App() {
  const students: Student[] = [
    {
      id: 1,
      name: "João Silva",
      class: "8A",
      grades: { portugues: 8.5, matematica: 7.8, historia: 9.0, ciencias: 8.2, geografia: 8.8, ensinoReligioso: 7.5 }
    },
    {
      id: 2,
      name: "Maria Oliveira",
      class: "8A",
      grades: { portugues: 9.2, matematica: 8.5, historia: 8.8, ciencias: 9.0, geografia: 9.5, ensinoReligioso: 8.0 }
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <LayoutInicial>
          <Routes>
            <Route path="/" element={<Home students={students} />} />
            <Route path="/ranking" element={<Ranking students={students} />} />
          </Routes>
        </LayoutInicial>
      </Router>
    </ThemeProvider>
  );
}

export default App;