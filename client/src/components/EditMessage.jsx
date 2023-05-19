import { useState } from 'react';

export const EditMessage = ({ message, onUpdate }) => {
  const [text, setText] = useState(message.text);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:3001/edit-messages/${message.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const updatedMessage = await response.json();
    onUpdate(updatedMessage);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input className='text-orange-500 font-normal' value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
};
