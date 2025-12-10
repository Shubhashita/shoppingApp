import { useState } from 'react';

function ShoppingList({ items, onToggle, onDelete, onEdit }) {
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    const startEdit = (item) => {
        setEditingId(item.id);
        setEditText(item.text);
    };

    const saveEdit = (id) => {
        onEdit(id, editText);
        setEditingId(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    if (items.length === 0) {
        return (
            <div className="empty-state">
                <p>Your list is empty.</p>
                <span style={{ fontSize: '2rem' }}>🛒</span>
                <style>{`
          .empty-state {
            text-align: center;
            color: var(--secondary-color);
            padding: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
          }
        `}</style>
            </div>
        );
    }

    return (
        <ul className="shopping-list">
            {items.map((item) => (
                <li key={item.id} className={`item ${item.completed ? 'completed' : ''}`}>
                    <label className="checkbox-wrapper">
                        <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => onToggle(item.id, item.completed)}
                        />
                        <span className="checkmark"></span>
                    </label>

                    {editingId === item.id ? (
                        <input
                            type="text"
                            className="edit-input"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onBlur={() => saveEdit(item.id)}
                            onKeyDown={(e) => e.key === 'Enter' && saveEdit(item.id)}
                            autoFocus
                        />
                    ) : (
                        <span
                            className="item-text"
                            onClick={() => startEdit(item)}
                            title="Click to edit"
                        >
                            {item.text}
                        </span>
                    )}

                    <button
                        className="delete-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(item.id);
                        }}
                        aria-label="Delete item"
                    >
                        ×
                    </button>
                </li>
            ))}

            <style>{`
        .shopping-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .item {
          display: flex;
          align-items: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius);
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .item:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .item.completed .item-text {
          /* text-decoration: line-through; -- User requested removal */
          color: var(--secondary-color);
          opacity: 0.8;
        }

        .item-text {
          flex: 1;
          margin-left: 1rem;
          font-size: 1.1rem;
          cursor: text;
          user-select: none;
        }

        .edit-input {
          flex: 1;
          margin-left: 1rem;
          padding: 0.25rem;
          font-size: 1.1rem;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--primary-color);
          color: white;
        }

        /* Custom Checkbox */
        .checkbox-wrapper {
          position: relative;
          display: inline-block;
          width: 24px;
          height: 24px;
          cursor: pointer;
        }

        .checkbox-wrapper input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .checkmark {
          position: absolute;
          top: 0;
          left: 0;
          height: 24px;
          width: 24px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.2s;
        }

        .checkbox-wrapper:hover input ~ .checkmark {
          background-color: rgba(255, 255, 255, 0.2);
        }

        .checkbox-wrapper input:checked ~ .checkmark {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
        }

        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
          left: 8px;
          top: 4px;
          width: 6px;
          height: 12px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .checkbox-wrapper input:checked ~ .checkmark:after {
          display: block;
        }

        /* Delete Button */
        .delete-btn {
          background: transparent;
          color: var(--secondary-color);
          font-size: 1.5rem;
          padding: 0.25rem 0.5rem;
          line-height: 1;
          border-radius: 4px;
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.2s;
        }

        .item:hover .delete-btn {
          opacity: 1;
          transform: translateX(0);
        }

        .delete-btn:hover {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }
      `}</style>
        </ul>
    );
}

export default ShoppingList;
