import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css'

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  const history = useHistory();

  // serve para disparar uma função em algum determinado momento do componente
  // nesse caso, assim que o componente é mostrado em tela
  useEffect(() => {
    // buscar todos casos da ONG logada
    // passando o header(Authorization: id)
    api.get('profiles', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, { 
        headers: {
          Authorization: ongId,
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch(err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="e02041"></FiPower>
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {/* percorrendo todos os incidentes e jogando numa váriavel que vai retornar um conteudo */}
        {/* eu poderia colocar um {} mas ai teria que colocar um return dentro das chaves */}
        {/* fazendo direto é necessário colocar o () */}
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            {/* Intl padrão do Javascript par formatação de numeros, datas */}
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            {/* <button onClick={handleDeleteIncident(incident.id)} type="button"> */}
            {/* passando do jeito acima, todos os incidentes serão deletados quando aprensentar na tela */}
            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}