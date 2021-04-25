import React, { useState } from 'react';
import './customers.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiUser } from 'react-icons/fi'
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';


export default function Customers() {

  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');

  async function handleAdd(e) {
    e.preventDefault();

    if (nomeFantasia !== '' && cnpj !== '' && endereco !== '') {
      await firebase.firestore().collection('Customers').add({
        NomeFantasia: nomeFantasia,
        CNPJ: cnpj,
        Endereco: endereco
      }).then(() => {
        setNomeFantasia('');
        setCnpj('');
        setEndereco('');
        toast.success('Empresa Cadastrada com sucesso!');
      }).catch((error) => {
        console.log(error);
        toast.error('Ops, Algo deu errado !');
      })
    } else {
      toast.error('Error, Preencha os campos');
    }



  }


  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Clientes">
          <FiUser size={25} />
        </Title>

        <div className="container">
          <form className="form-profile customers" onSubmit={handleAdd}>
            <label for="fantasia">Nome Fantasia</label>
            <input id="fantasia" type="text" placeholder="Nome da empresa" value={nomeFantasia} onChange={(e) => { setNomeFantasia(e.target.value) }} />

            <label for="cnpj">CNPJ</label>
            <input id="cnpj" type="text" placeholder="CNPJ da empresa" value={cnpj} onChange={(e) => { setCnpj(e.target.value) }} />

            <label for="endereco" >Endereço</label>
            <input id="endereco" type="text" placeholder="endereço da empresa" value={endereco} onChange={(e) => { setEndereco(e.target.value) }} />

            <button type="submit">Cadastrar</button>

          </form>
        </div>
      </div>
    </div>
  );
}
