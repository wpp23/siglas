import React from 'react';
import { Link } from 'react-router-dom';
import imgSearch from '../images/sample-search.png';


export default function NotFound() {
  return (
    <main
      className="main d-flex flex-fill"
      id="main"
    >
      <div className="container-fluid d-flex">
        <div className="row"> 
          <div className="col pt-0 pb-5">
            <div className="main-content pl-sm-3" id="main-content">
              <br-breadcrumb
                label="Breadcrumb Curto"
                links="[
                  {
                    'label': 'Página Inicial',
                    'url': '/',
                    'home': true
                  },
                  {
                    'label': 'Não encontrado...',
                    'active': true
                  }
                ]"
              ></br-breadcrumb>

              <div className='row align-items-center justify-content-center'> 
                <div className='col col-sm-12 col-m-8 col-lg-10 text-right'>
                    <img src={imgSearch}/>
                </div>
                <div className='col col-sm-6 col-m-6 col-lg-6'>
                  <h4>Caminho não encontrado...</h4>
                  <p>Verifique o endereço digitado pois a rota não está definida.</p>
                </div>
              </div>
            </div>
            <br/>
            <br/>
            <br/>
            <div className='row justify-content-right'> 
                <div className='col col-sm-12 col-m-8 col-lg-10 text-right'>
                  <Link to={"/"}><i className="fas fa-home" aria-hidden="true"></i> Ir para a Página Principal</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
