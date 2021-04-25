import React from 'react';
import './modal.css';
import { FiX } from 'react-icons/fi'
export default function Modal({ conteudo, close}) {

  return (
    <div className="modal">
      <div className="container">
        <button className="close" onClick={close}>
          <FiX size={23} color="#000" />
        </button>
        <div className="">
          <h2>Detalhes do chamado</h2>

          <div className="row">
            <span>
              Cliente: <i>{conteudo.Cliente}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Assunto: <i>{conteudo.Assunto}</i>
            </span>
            <span>
              Cadastrado em: <i>{conteudo.Cadastrado}</i>
            </span>
          </div>


          <div className="row">
            <span>
              Status: <i style={{ color: '#FFF', backgroundColor: conteudo.Status === 'Aberto' ? '#5cb85c' : '#999' }}>{conteudo.Status}</i>
            </span>
          </div>
          {conteudo.Complemento !== '' && (
            <>
              <h3>Complemento</h3>
              <p>{conteudo.Complemento}</p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}