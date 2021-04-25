import React, { useState, useEffect } from 'react';
import firebase from '../../services/firebaseConnection';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlusCircle } from 'react-icons/fi';
import {  useParams } from 'react-router-dom';
import './new.css';

export default function New() {
  var data = new Date(); var dia = data.getDate(); var mes = data.getMonth(); var ano = data.getFullYear();
  const diaAtual = `${dia}/${mes}/${ano}`;

  const [assunto, setAssunto] = useState('Suporte');
  const [status, setStatus] = useState('Aberto');
  const [customerSelected, setCustomerSelected] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [complemento, setComplemento] = useState('');
  const [loading, setLoading] = useState(true);
  const [idcustomer, setIdCustomer] = useState(false)
  const { id } = useParams();

  async function loadId(lista) {
    await firebase.firestore().collection('Registers').doc(id).get()
      .then((snapshot) => {
        setStatus(snapshot.data().Status);
        setAssunto(snapshot.data().Assunto);
        setComplemento(snapshot.data().Complemento);

        let index = lista.findIndex(item => item.id === snapshot.data().ClienteId)
        setCustomerSelected(index);
        setIdCustomer(true);
      }).catch((error) => {
        alert('Cliente nao encontrado')
        console.log(error);
      })
  }

  function handleRegister(e) {
    e.preventDefault();

    firebase.firestore().collection('Registers').add({
      ClienteId: customers[customerSelected].id,
      Cliente: customers[customerSelected].nomeFantasia,
      Assunto: assunto,
      Status: status,
      Complemento: complemento,
      Cadastrado: diaAtual
    }).then(() => {
      alert('cadastrado com sucesso!');
    }).catch((error) => {
      console.log('erro');
    })
  }
  function handleAssunto(e) {
    setAssunto(e.target.value);
  }
  function handleComplemento(e) {
    setComplemento(e.target.value);
  }

  function handleStatus(e) {
    setStatus(e.target.value)
  }

  function handleClientes(e) {
    setCustomerSelected(e.target.value);
  }

  useEffect(() => {
    async function loadCustomers() {
      await firebase.firestore().collection('Customers').get().then((snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nomeFantasia: doc.data().NomeFantasia
          });
        })
        setCustomers(lista);
        setLoading(false);
        if (id) {
          loadId(lista);
        }
      })
    }
    loadCustomers();

  }, [])




  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Novo Chamado">
          <FiPlusCircle size={25} />
        </Title>
        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Cliente</label>
            {loading ? (
              <input type="text" disabled={true} value="Carregando Clientes ..." />) : (
              <select value={customerSelected} onChange={handleClientes}>
                {customers.map((item, index) => {
                  return (
                    <option key={item.id} value={index}>
                      {item.nomeFantasia}
                    </option>)
                })}
              </select>
            )}


            <label>Assunto</label>
            <select value={assunto} onChange={handleAssunto}>
              <option value="Suporte">Suporte</option>
              <option value="Visita Tecnica">Visita Tecnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>
            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Aberto"
                onChange={handleStatus}
                checked={status === 'Aberto'} />
              <span>Em aberto</span>

              <input
                type="radio"
                name="radio"
                value="Progresso"
                onChange={handleStatus}
                checked={status === 'Progresso'} />
              <span>Progresso</span>

              <input
                type="radio"
                name="radio"
                value="Atendido"
                onChange={handleStatus}
                checked={status === 'Atendido'} />
              <span>Atendido</span>
            </div>
            <label>Complemento</label>
            <textarea
              type="text"
              placeholder="Descreva seu problema(opcional)."
              onChange={handleComplemento}
              value={complemento}
            />
            <button type="submit">Registrar</button>
          </form>

        </div>
      </div>
    </div>
  );
}