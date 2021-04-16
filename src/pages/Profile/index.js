import React from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiSettings } from 'react-icons/fi'

export default function Profile() {
  return (
    <div>
      <Header />
      <div className="content">
        <Title name="meu perfil">
          <FiSettings size={25} />Meu Perfil
        </Title>
      </div>

    </div>
  );
}