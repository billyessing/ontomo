import { useNavigate } from 'react-router-dom';


const Landing = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      margin: '0', 
      padding: '0', 
      overflow: 'hidden'
    }}>
      <iframe 
        src="/webflow/index.html" 
        title="Landing Page" 
        width="100%" 
        height="100%" 
        style={{ border: 'none' }}
      />
      <button 
        onClick={() => navigate('/signup')} 
        style={{
          position: 'absolute',
          height: '38.636px',
          top: '20px', 
          right: '177px', 
          padding: '10px 20px',
          backgroundColor: 'white',
          color: 'black',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Sign Up
      </button>
      <button 
        onClick={() => navigate('/login')} 
        style={{
          position: 'absolute', 
          top: '20px', 
          right: '20px', 
          padding: '10px 20px',
          backgroundColor: '#006400',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        LOGIN ログイン
      </button>
    </div>
  );
};

export default Landing;
