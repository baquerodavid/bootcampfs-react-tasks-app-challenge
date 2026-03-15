import { useState } from "react";

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