import React, { useState } from 'react';
import { Student } from '../types';

interface CadastroProps {
  addStudent: (student: Student) => void;
  students: Student[];
}

const Cadastro: React.FC<CadastroProps> = ({ addStudent, students }) => {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [grades, setGrades] = useState({
    portugues: 0,
    matematica: 0,
    historia: 0,
    ciencias: 0,
    geografia: 0,
    ensinoReligioso: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: Student = {
      id: students.length + 1,
      name,
      class: className,
      grades,
      effortPoints: 0,
    };
    addStudent(newStudent);
    setName('');
    setClassName('');
    setGrades({
      portugues: 0,
      matematica: 0,
      historia: 0,
      ciencias: 0,
      geografia: 0,
      ensinoReligioso: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Cadastro de Aluno</h1>
      <div>
        <label>Nome:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label>Turma:</label>
        <input type="text" value={className} onChange={e => setClassName(e.target.value)} required />
      </div>
      <div>
        <label>Português:</label>
        <input
          type="number"
          value={grades.portugues}
          onChange={e => setGrades({ ...grades, portugues: Number(e.target.value) })}
          required
        />
      </div>
      <div>
        <label>Matemática:</label>
        <input
          type="number"
          value={grades.matematica}
          onChange={e => setGrades({ ...grades, matematica: Number(e.target.value) })}
          required
        />
      </div>
      <div>
        <label>História:</label>
        <input
          type="number"
          value={grades.historia}
          onChange={e => setGrades({ ...grades, historia: Number(e.target.value) })}
          required
        />
      </div>
      <div>
        <label>Ciências:</label>
        <input
          type="number"
          value={grades.ciencias}
          onChange={e => setGrades({ ...grades, ciencias: Number(e.target.value) })}
          required
        />
      </div>
      <div>
        <label>Geografia:</label>
        <input
          type="number"
          value={grades.geografia}
          onChange={e => setGrades({ ...grades, geografia: Number(e.target.value) })}
          required
        />
      </div>
      <div>
        <label>Ensino Religioso:</label>
        <input
          type="number"
          value={grades.ensinoReligioso}
          onChange={e => setGrades({ ...grades, ensinoReligioso: Number(e.target.value) })}
          required
        />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default Cadastro;