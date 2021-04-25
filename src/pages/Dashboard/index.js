import React, { useEffect, useState} from 'react';

import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Title from '../../components/Title';
import Modal from '../../components/Modal';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import firebase from '../../services/firebaseConnection';

import './dashboard.css';


export default function Dashboard() {

  const [chamados, setChamados] = useState([1]);
  const [Registro, setRegistro] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();



  useEffect(() => {
    async function loadChamados() {
      await firebase.firestore().collection('Registers').orderBy('Cadastrado', 'desc').get().then((snapshot) => {
        
        let registro = [];
        snapshot.forEach((item) => {
        
          registro.push({
            id: item.id,
            Cliente: item.data().Cliente,
            Assunto: item.data().Assunto,
            Status: item.data().Status,
            Cadastrado: item.data().Cadastrado,
            Complemento: item.data().Complemento
          })
        })
        setRegistro(registro);
      })
    }
    loadChamados();
    return () => { }
  }, [])



  function togglePostModal(item) {
    setShowPostModal(!showPostModal);
    setDetail(item);
  }


  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Atendimentos">
          <FiMessageSquare size={25} />
        </Title>
        {chamados.length === 0 ? (
          <div className="container dashboard">
            <span>Nenhum chamado registrado ...</span>
            <Link to="/new" className="new"><FiPlus size={25} />Novo Chamado</Link>
          </div>
        ) : (
          <>
            <Link to="/new" className="new"><FiPlus size={25} />Novo Chamado</Link>

            <table>
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cadastrado em</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                {Registro.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td data-label="Cliente">{item.Cliente}</td>
                      <td data-label="Assunto">{item.Assunto}</td>
                      <td data-label="Status">
                        {
                          <span className="badge" style={{ backgroundColor: item.Status === 'Aberto' ? '#5cb85c' : 'silver' }}>{item.Status}</span>
                        }

                      </td>
                      <td data-label="Cadastrado">{item.Cadastrado}</td>
                      <td data-label="#">
                        <button className="action" style={{ backgroundColor: '#3583f6' }} onClick={() => togglePostModal(item)} >
                          <FiSearch color="#FFF" size={17} />
                        </button>
                        <Link to={`/new/${item.id}`} className="action" style={{ backgroundColor: '#f6a935' }}>
                          <FiEdit2 color="#FFF" size={17} />
                        </Link>
                      </td>

                    </tr>
                  )
                })}


              </tbody>
            </table>
          </>
        )}

      </div>
      {showPostModal && (

        <Modal
          conteudo={detail}
          close={togglePostModal}
        />

      )}
    </div>
  )
}