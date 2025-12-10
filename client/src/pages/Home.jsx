import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <div className="hero-section">
                <h1>Welcome to ShopList</h1>
                <p className="subtitle">The smartest way to organize your shopping.</p>

                <div className="cta-buttons">
                    <Link to="/list" className="cta-primary">Go to My Shopping List 🛒</Link>
                </div>
            </div>

            <div className="features-grid">
                <div className="feature-card">
                    <div className="icon">📝</div>
                    <h3>Easy Management</h3>
                    <p>Add, edit, and check off items with a single click. Keep your chaotic life organized.</p>
                </div>

                <div className="feature-card">
                    <div className="icon">🔒</div>
                    <h3>Secure & Private</h3>
                    <p>Your list is linked to your account. Only you can access your personal data.</p>
                </div>

                <div className="feature-card">
                    <div className="icon">🎨</div>
                    <h3>Premium Design</h3>
                    <p>Experience a beautiful, modern interface with glassmorphism aesthetics.</p>
                </div>
            </div>

            <style>{`
        .home-container {
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
          gap: 4rem;
          color: white;
          text-align: center;
          padding: 2rem;
          animation: fadeIn 0.8s ease-out;
        }

        .hero-section h1 {
          font-size: clamp(3rem, 6vw, 5rem);
          background: linear-gradient(135deg, #fff 0%, #cbd5e1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
        }

        .subtitle {
          font-size: 1.5rem;
          color: var(--secondary-color);
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-primary {
          display: inline-block;
          background: var(--primary-color);
          color: white;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-size: 1.25rem;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        }

        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.6);
          background: var(--primary-hover);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          padding: 2rem;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: left; /* Cards look better left aligned usually, but centering is fine too */
          transition: transform 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.08);
        }

        .feature-card .icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: white;
        }

        .feature-card p {
          color: var(--secondary-color);
          line-height: 1.6;
        }
      `}</style>
        </div>
    );
};

export default Home;
