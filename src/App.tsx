// src/app.tsx
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './styles/theme';
import LayoutInicial from './components/LayoutInicial';
import Home from './pages/Home';
import Ranking from './pages/Ranking';
import Cadastro from './pages/Cadastro';
import EditCadastro from './pages/EditCadastro';

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
  const [students, setStudents] = useState<Student[]>([]);

  const addStudent = (newStudent: Student) => {
    setStudents(prevStudents => [...prevStudents, newStudent]);
  };

  const updateStudent = (updatedStudent: Student) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <LayoutInicial>
          <Routes>
            <Route path="/" element={<Home students={students} />} />
            <Route path="/ranking" element={<Ranking students={students} />} />
            <Route path="/cadastro" element={<Cadastro addStudent={addStudent} students={students} />} />
            <Route path="/edit/:id" element={<EditCadastro students={students} updateStudent={updateStudent} />} />
          </Routes>
        </LayoutInicial>
      </Router>
    </ThemeProvider>
  );
}

export default App;