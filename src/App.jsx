import './App.css'
import { useState, useEffect } from 'react'
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from 'react-icons/bs';

const API = 'http://localhost:5000';

function App() {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setTitle('');
    console.log('Enviou!');
  };

  return (
    <div className="App">
      <header className="todo-header">
        <h1>ToDo</h1>
      </header>

      <section className="todo-form">
        <h2>Insira a sua próxima tarefa:</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="title">O que você vai fazer?</label>
            <input type="text" name="title" placeholder="Título da Tarefa"
              onChange={ e => setTitle(e.target.value) }
              value={title || ''} required/>
          </div>

          <button type="submit">Enviar</button>
        </form>
      </section>

      <section className="todo-list">
        <h2>Lista de Tarefas</h2>
        { todos.length === 0 && <p>Não há tarefas.</p> }
      </section>
    </div>
  )
}

export default App
