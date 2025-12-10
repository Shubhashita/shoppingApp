import { useState } from 'react';

function ItemForm({ onAdd }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd(text);
        setText('');
    };

    return (
        <form className="item-form" onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What do you need to buy?"
                    autoFocus
                />
                <button type="submit" disabled={!text.trim()}>
                    Add
                </button>
            </div>

            <style>{`
        .item-form {
          margin-bottom: 2rem;
        }
        .input-group {
          display: flex;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.5rem;
          border-radius: var(--radius);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: border-color 0.2s;
        }
        .input-group:focus-within {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }
        .input-group input {
          flex: 1;
          background: transparent;
          border: none;
          color: white;
          padding: 0.75rem;
          font-size: 1rem;
        }
        .input-group input::placeholder {
          color: var(--secondary-color);
        }
        .input-group button {
          background: var(--primary-color);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: calc(var(--radius) - 4px);
          font-weight: 600;
        }
        .input-group button:hover:not(:disabled) {
          background: var(--primary-hover);
        }
        .input-group button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
        </form>
    );
}

export default ItemForm;
