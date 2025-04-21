import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './styles/theme';
import LayoutInicial from './components/LayoutInicial';
import Home from './pages/Home';
import Ranking from './pages/Ranking';
import Cadastro from './pages/Cadastro';
import EditCadastro from './pages/EditCadastro';
import { Student, Suggestion } from './types';

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [apiKey, setApiKey] = useState<string>('');

  const addStudent = (newStudent: Student) => {
    setStudents(prevStudents => [...prevStudents, { ...newStudent, effortPoints: 0 }]);
  };

  const updateStudent = (updatedStudent: Student) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  const addEffortPoints = (id: number, points: number) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === id ? { ...student, effortPoints: student.effortPoints + points } : student
      )
    );
  };

  const approveSuggestion = (id: number) => {
    setSuggestions(prev =>
      prev.map(suggestion =>
        suggestion.id === id ? { ...suggestion, status: 'approved' as const } : suggestion
      )
    );
  };

  const rejectSuggestion = (id: number) => {
    setSuggestions(prev => prev.filter(suggestion => suggestion.id !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <Router basename="/ranking2">
        <LayoutInicial>
          <Routes>
            <Route path="/" element={<Home students={students} />} />
            <Route
              path="/ranking"
              element={
                <Ranking
                  students={students}
                  addEffortPoints={addEffortPoints}
                  suggestions={suggestions}
                  setSuggestions={setSuggestions}
                  apiKey={apiKey}
                  setApiKey={setApiKey}
                  approveSuggestion={approveSuggestion}
                  rejectSuggestion={rejectSuggestion}
                />
              }
            />
            <Route path="/cadastro" element={<Cadastro addStudent={addStudent} students={students} />} />
            <Route path="/edit/:id" element={<EditCadastro students={students} updateStudent={updateStudent} />} />
          </Routes>
        </LayoutInicial>
      </Router>
    </ThemeProvider>
  );
}

export default App;