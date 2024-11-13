import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import '../styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefone, setTelefone] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isRegistering) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            setDoc(doc(db, "users", user.uid), {
              email: user.email,
              telefone: telefone
            });
            navigate('/');
          })
          .catch((error) => {
            setError(`Erro de autenticação: ${error.code}`);
          });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      let errorMessage = '';
      
      switch (errorCode) {
        case 'auth/invalid-credential':
          errorMessage = 'Email ou senha incorretos';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'Este email já está cadastrado';
          break;
        case 'auth/weak-password':
          errorMessage = 'A senha deve ter pelo menos 6 caracteres';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Erro de conexão. Verifique sua internet';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Muitas tentativas. Tente novamente mais tarde';
          break;
        default:
          errorMessage = 'Ocorreu um erro. Tente novamente';
      }
      
      setError(errorMessage);
      console.error('Erro de autenticação:', errorCode);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Barbearia</h2>
        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          {isRegistering && (
            <div className="form-group">
              <input
                type="tel"
                placeholder="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit">
            {isRegistering ? 'Cadastrar' : 'Entrar'}
          </button>
        </form>
        <button 
          className="toggle-button"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError('');
          }}
        >
          {isRegistering ? 'Já tenho uma conta' : 'Não tenho uma conta'}
        </button>
      </div>
    </div>
  );
}

export default Login; 