import './App.css'
import { useState, useEffect } from 'react'
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from 'react-icons/bs';

const API = 'http://localhost:5000';

function App() {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // get todos on page load
  useEffect(() => {

    const loadData = async () => {
      setLoading(true)

      try {
        const res = await fetch(API + '/todos');
        const data = await res.json();

        setLoading(false);
        setTodos(data);
        } catch (error) {
        console.log(error);
      }
    }

    loadData();
  }, []);

  // todo post
  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      id: Math.random(),
      title,
      time,
      done: false
    };

    await fetch(API + '/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    setTodos((prevState) => [...prevState, todo]);

    // envio para API
    console.log(todo);

    setTitle('');
    setTime('');
  };

  if (loading) {
    return <p>Carregando...</p>
  }

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

          <div className="form-control">
            <label htmlFor="time">Duração:</label>
            <input type="text" name="time" placeholder="Título da Tarefa"
              onChange={ e => setTime(e.target.value) }
              value={time || ''} required/>
          </div>

          <button type="submit">Criar Tarefa</button>
        </form>
      </section>

      <section className="todo-list">
        <h2>Lista de Tarefas</h2>
        { todos.length === 0 && <p>Não há tarefas.</p> }

        { todos.map((todo) => (
          <div className="todo" key={todo.id}>
            <h3 className={ todo.done ? 'todo-done' : '' }>{ todo.title }</h3>
            <p>Duração: { todo.time }</p>

            <div className="actions">
              <span>{ !todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill /> }</span>
              <BsTrash />
            </div>
          </div>
        )) }
      </section>
    </div>
  )
}

export default App
