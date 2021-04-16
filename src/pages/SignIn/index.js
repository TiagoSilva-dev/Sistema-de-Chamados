import React, { useState, useContext } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import './style.css';

export default function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, loadingAuth } = useContext(AuthContext);

  function handleSignIn(e) {

    e.preventDefault();
    if (email !== '' && password !== '') {
      signIn(email, password)
    }

  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema" />
        </div>
        <form onSubmit={handleSignIn}>
          <h1>Entrar</h1>
          <input type="email" placeholder="teste@teste.com" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
          <input type="password" placeholder="********" value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
          <button type="submit">{loadingAuth ? 'Carregando ...' : 'Acessar'}</button>
        </form>
        <Link to="/register">Criar uma conta </Link>
      </div>
    </div>
  );
}

