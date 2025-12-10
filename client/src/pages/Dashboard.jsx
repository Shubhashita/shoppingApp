import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ShoppingList from '../components/ShoppingList';
import ItemForm from '../components/ItemForm';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/items`;

function Dashboard({ viewMode = 'all', title = 'My Shopping List' }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    // UI State
    const [searchQuery, setSearchQuery] = useState('');
    // const [filter, setFilter] = useState('all'); // Removed internal filter state in favor of viewMode logic
    const [showAddModal, setShowAddModal] = useState(false);

    // Fetch Items
    useEffect(() => {
        fetchItems();
    }, [token]);

    const fetchItems = async () => {
        if (!token) return;
        try {
            const response = await fetch(API_URL, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch items');
            const data = await response.json();
            setItems(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Add Item
    const addItem = async (text) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ text }),
            });
            if (!response.ok) throw new Error('Failed to add item');
            const newItem = await response.json();
            setItems((prev) => [...prev, newItem]);
            setShowAddModal(false); // Close modal on success
        } catch (err) {
            console.error(err);
            alert('Error adding item');
        }
    };

    // Toggle Complete
    const toggleComplete = async (id, currentStatus) => {
        try {
            setItems(prev => prev.map(item =>
                item.id === id ? { ...item, completed: !currentStatus } : item
            ));

            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ completed: !currentStatus }),
            });

            if (!response.ok) throw new Error('Failed to update item');
        } catch (err) {
            console.error(err);
            fetchItems();
        }
    };

    // Edit Item Text
    const editItem = async (id, newText) => {
        try {
            setItems(prev => prev.map(item =>
                item.id === id ? { ...item, text: newText } : item
            ));

            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ text: newText }),
            });

            if (!response.ok) throw new Error('Failed to update item');
        } catch (err) {
            console.error(err);
            fetchItems();
        }
    };

    // Delete Item
    const deleteItem = async (id) => {
        try {
            setItems(prev => prev.filter(item => item.id !== id));
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to delete item');
        } catch (err) {
            console.error(err);
            fetchItems();
        }
    };

    // Filter & Search Logic
    const filteredItems = items.filter(item => {
        const matchesSearch = item.text.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter =
            viewMode === 'all' ? true :
                viewMode === 'pending' ? !item.completed :
                    viewMode === 'completed' ? item.completed : true;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="app-container">
            <div className="dashboard-content">

                <header className="app-header">
                    <h1>{title}</h1>
                    <p>{viewMode === 'pending' ? 'Items to buy' : viewMode === 'completed' ? 'Items you have' : 'Manage your essentials'}</p>
                </header>

                {/* Search & Action Row */}
                <div className="dashboard-controls">
                    <div className="search-bar">
                        <span role="img" aria-label="search">🔍</span>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Filter buttons removed as View is controlled by Route now */}

                    <button className="add-item-btn" onClick={() => setShowAddModal(true)}>
                        <span>+</span> Add Item
                    </button>
                </div>

                {/* Modal for Add Item */}
                {showAddModal && (
                    <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <h3>Add New Item</h3>
                            <ItemForm onAdd={addItem} />
                            <button className="close-modal" onClick={() => setShowAddModal(false)}>Cancel</button>
                        </div>
                    </div>
                )}

                {/* List */}
                {loading ? (
                    <p style={{ textAlign: 'center', opacity: 0.7 }}>Loading...</p>
                ) : error ? (
                    <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
                ) : (
                    <ShoppingList
                        items={filteredItems}
                        onToggle={toggleComplete}
                        onDelete={deleteItem}
                        onEdit={editItem}
                    />
                )}
            </div>

            <style>{`
        .dashboard-content {
           width: 100%;
           max-width: 1200px;
           padding: 1rem;
        }

        .dashboard-controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .search-bar {
          flex: 2; /* Take more space */
          min-width: 200px;
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.2);
          padding: 0.75rem 1.25rem;
          border-radius: 50px;
          border: 1px solid var(--card-border);
          transition: border-color 0.2s;
        }
        
        .search-bar:focus-within {
          border-color: var(--primary-color);
        }

        .search-bar input {
          background: transparent;
          border: none;
          color: white;
          width: 100%;
          margin-left: 0.5rem;
          font-size: 1rem;
        }

        .filter-group {
          display: flex;
          background: rgba(0, 0, 0, 0.2);
          padding: 0.25rem;
          border-radius: 50px;
          border: 1px solid var(--card-border);
        }

        .filter-btn {
          background: transparent;
          color: var(--secondary-color);
          padding: 0.5rem 1rem;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .filter-btn:hover {
          color: white;
        }

        .filter-btn.active {
          background: var(--primary-color);
          color: white;
        }

        .add-item-btn {
          background: var(--primary-color);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
          transition: all 0.2s;
          white-space: nowrap;
        }

        .add-item-btn:hover {
          background: var(--primary-hover);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
        }
        
        .add-item-btn span {
          font-size: 1.25rem;
          line-height: 1;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: #1e293b;
          padding: 2rem;
          border-radius: var(--radius);
          width: 90%;
          max-width: 400px;
          border: 1px solid var(--card-border);
        }

        .modal-content h3 {
          margin-bottom: 1.5rem;
          color: white;
        }

        .close-modal {
          background: transparent;
          color: var(--secondary-color);
          margin-top: 1rem;
          width: 100%;
          padding: 0.5rem;
        }
        
        .close-modal:hover {
          color: white;
        }
      `}</style>
        </div >
    );
}

export default Dashboard;
