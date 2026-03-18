import { useState } from "react";

// (prev => !prev) -> Significa: Si viene false, se cambia a true. Si viene true, se cambia a false

function InputCreate() {
  const [inputValue, setInputValue] = useState('');
  const urlApi = 'http://localhost:3001/create';

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatedValue = inputValue.trim();

    if (!formatedValue) return;

    try {
      const response = await fetch(urlApi, {
        method: 'POST', // Método HTTP
        headers: {
          'Content-Type': 'application/json', // Indicamos que el contenido es JSON
        },
        body: JSON.stringify({ title: formatedValue }), // Convertimos el payload de JS a JSON
      });
      const payload = await response.json();
      setInputValue('')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2>Crear una tarea</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Escribe tu tarea"
        />
        <button type="submit">Crear tarea</button>
      </form>
    </>
  );
}

export default InputCreate;



// 👇 CODIGO DE LA LIVE REVIEW EMPIEZA DESDE AQUÍ 👇
/* 
import { useState } from "react";

function InputCreate ({setUpdate}) {
  const [title, setTitle] = useState('')
  const [res, setRes] = useState('Ready!!!')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const baseURL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000/'
    const urlAPICreate = baseURL+'create'
    const payload = {title}

    try {
      const response = await fetch(urlAPICreate, {
        method: 'POST', // Método HTTP
        headers: {
          'Content-Type': 'application/json', // Indicamos que el contenido es JSON
        },
        body: JSON.stringify(payload), // Convertimos el payload de JS a JSON
      })
      if(response.ok) {
        const data = await response.json()
        setRes(`Enviado: ${data.title}`)
        setTitle('')
        setUpdate(prev => !prev)
      } else {
        throw new Error('se ha roto')
      }
    } catch (err) {
      console.log('Error:', err)
    }
  }

  return (
  <>
  <form onSubmit={handleSubmit}>
    <input 
    type="text"
    placeholder="Escribe una tarea"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    />
    <button type="submit">Enviar</button>
  </form>
  {res}
  </>
  )
}

export default InputCreate;
 */