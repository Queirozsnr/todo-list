import React, { useState } from 'react';
import './App.css';
import Toast from 'react-bootstrap/Toast';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Fazer compras",
      description: "Comprar mantimentos para a semana.",
      category: "Compras",
      completed: false,
    },
    {
      id: 2,
      title: "Estudar React",
      description: "Aprender React para desenvolver aplicativos.",
      category: "Estudos",
      completed: true,
    },
  ]);
  const [newTask, setNewTask] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [completed, setCompleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [addButtonClicked, setAddButtonClicked] = useState(false);

  const getInputClass = (value: string) => {
    return addButtonClicked && value.trim() === "" ? "form-control is-invalid" : "form-control";
  };

  const addTask = () => {
    if (newTask.trim() === "" || category.trim() === "" || description.trim() === "") {
      setShowToast(true);
      setAddButtonClicked(true);
      return;
    }
    setShowToast(false)
    if (newTask) {
      const newTaskObject = {
        id: Date.now(),
        title: newTask,
        description: description,
        category: category,
        completed: completed,
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask('');
      setDescription('');
      setCategory('');
      setCompleted(false);
      setAddButtonClicked(false);
    }
  };
  
  const filterTasks = (task: { completed: boolean }) => {
    if (filterType === 'all') {
      return true; // Mostrar todas as tarefas
    } else if (filterType === 'completed') {
      return task.completed;
    } else {
      return !task.completed;
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Função para marcar ou desmarcar uma tarefa como concluída
  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const filteredTasks = tasks.filter(task => {
    const titleMatch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const descriptionMatch = task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = task.category.toLowerCase().includes(searchTerm.toLowerCase());
    const completedMatch = searchTerm === "concluido" && task.completed;

    return titleMatch || descriptionMatch || categoryMatch || completedMatch;
  });

  return (
    <div className="App">
      <div className="container">
        <header className='py-5 text-center'>
          <div className="col text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" fill="currentColor" className="bi bi-body-text" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5Zm0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Z" />
            </svg>
            <h3 className='mt-3'>Lista de Tarefas TODO LIST</h3>
          </div>
        </header>

        <div className="row">
          <div className="row flex justify-content-center">
            <div className="text-center">
              <h4>Lista de Tarefas</h4>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
              <input className='form-control mr-sm-2 m-1' type="text" placeholder="Pesquisar tarefas" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <select className="form-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">Todas as tarefas</option>
                <option value="completed">Concluídas</option>
                <option value="not-completed">Não concluídas</option>
              </select>
            </div>
          </div>
          <div id="sectionCard" className="row flex justify-content-center">
            {filteredTasks.map(task => (
               filterTasks(task) && (
                <div className="col-sm-6 col-md-4 col-xl-3 my-2">
                  <div className="card card-body" style={{height: "19rem"}}>
                    <li className='list-unstyled' key={task.id}>
                      <h5 className="card-title">{task.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{task.category}</h6>
                      <p style={{height: "85px"}} className='card-text'>{task.description}</p>
                      <p> {task.completed ? "Concluido" : "Pendente"}</p>
                      <button className='btn btn-danger w-100 mb-2' onClick={() => deleteTask(task.id)}>Excluir</button>
                      <button className={['btn w-100', task.completed ? 'btn-warning' : 'btn-success'].join(' ')} onClick={() => toggleTaskCompletion(task.id)}>
                        {task.completed ? "Desmarcar Conclusão" : "Marcar Conclusão"}
                      </button>
                    </li>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        <div className="row form-group">
          <div className="text-center">
            <h4>Adicionar Nova Tarefa</h4>
          </div>
          <div className="mt-1 d-flex justify-content-center">
            <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
              <Toast.Header>
                <strong className="mr-auto">Validação</strong>
              </Toast.Header>
              <Toast.Body>Preencha todos os campos obrigatórios.</Toast.Body>
            </Toast>
          </div>
          <div className="col-6">
            <label htmlFor="newTask">Título da Tarefa*</label>
            <input className={getInputClass(newTask)} type="text" placeholder="Adicionar nova tarefa" required value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
          </div>
          <div className="col-6">
            <label htmlFor="category">Categoria*</label>
            <input className={getInputClass(category)} type="text" placeholder="Adicionar nova tarefa" required value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div className="col-12">
            <label htmlFor="description">Descrição*</label>
            <textarea className={getInputClass(description)} placeholder="Adicionar nova tarefa" required value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className='mt-4 d-flex justify-content-end'>
            <button className='btn btn-success' onClick={addTask}>Adicionar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
