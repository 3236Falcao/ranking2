import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Student } from '../types';

interface EditCadastroProps {
  students: Student[];
  updateStudent: (student: Student) => void;
}

const EditCadastro: React.FC<EditCadastroProps> = ({ students, updateStudent }) => {
  const { id } = useParams<{ id: string }>();
  const student = students.find(s => s.id === Number(id));
  const [name, setName] = useState(student?.name || '');
  const [className, setClassName] = useState(student?.class || '');
  const [grades, setGrades] = useState(student?.grades || {
    portugues: 0,
    matematica: 0,
    historia: 0,
    ciencias: 0,
    geografia: 0,
    ensinoReligioso: 0,
  });

  useEffect(() => {
    if (student) {
      setName(student.name);
      setClassName(student.class);
      setGrades(student.grades);
    }
  }, [student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (student) {
      const updatedStudent: Student = {
        ...student,
        name,
        class: className,
        grades,
        effortPoints: student.effortPoints,
      };
      updateStudent(updatedStudent);
    }
  };

  if (!student) return <div>Aluno não encontrado</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Editar Aluno</h1>
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
      <button type="submit">Salvar</button>
    </form>
  );
};

export default EditCadastro;