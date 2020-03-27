import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
  // colocando as variaveis num estado para manipular depois
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  // variavel que vai armazenar uma função javascript para ir para alguma página
  const history = useHistory();

  // função responsável por fazer o cadastro de usuário
  // vai ser disparada assim que o formulário der um submit
  // passando um parametro para prevenir o comportamento padrão(não dar um reload na página)
  async function handleRegister(e) {
    e.preventDefault();

    // agora temos acesso a todas as informações inputadas pelo usuario
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    // enviar valores para a nossa api
    // serviço '/ongs' recebe esses valores e devolve um id
    // sem pre usar await, colocar async na função
    // try/catch vai capturar erro na criação da ONG
    try {
      const response = await api.post('ongs', data);
      alert(`Seu ID de acesso: ${response.data.id}`);

      // depois do cadastro vai enviar para a raiz que é a página de login
      history.push('/');
    } catch(err) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041"/>
              Voltar para o logon
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input 
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input 
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />

            <input
              placeholder="UF"
              style={{  width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}