import React, { useContext } from 'react';
import imgBackHome from '../images/back-siglas-07.jpg';
import { Link } from 'react-router-dom';
import {AuthContext} from '../contexts/AuthContext';

export default function Home() {

  const { auth } = useContext(AuthContext); // autenticado?

  return (
    <main
      className="main d-flex flex-fill"
      id="main"
      style={{
        backgroundImage: `url(${imgBackHome})`,
        backgroundSize: '38.4%', // Reduced to 38.4% (48% - 20% = 38.4%)
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#F4F2E5',
        backgroundPosition: 'center',
      }}
    >
      <div className="container-fluid d-flex">
        <div className="row">
          <div className="col pt-0 pb-5">
            <div className="main-content pl-sm-3" id="main-content">
                <nav className="br-breadcrumb" aria-label="Breadcrumbs">
                  <ol className="crumb-list" role="list">
                    <li className="crumb home"><Link to="/" className="br-button circle"><span className="sr-only">Página inicial</span><i className="fas fa-home"></i></Link></li>
                    <li className="crumb" data-active="active"><i className="icon fas fa-chevron-right"></i><span tabIndex={0} aria-current="page">Início</span>
                    </li>
                  </ol>
                </nav>

              {/* Siglas */}
              <Link to={auth?"/sigla":"/login"} style={{
                position: 'absolute',
                top: '20%', 
                left: '32%', 
                width: '10%', 
                height: '45%', 
              }}>
              </Link>

              {/* Pessoa */}
              <Link to={auth?"/pessoa":"/login"} style={{
                position: 'absolute',
                top: '20%', 
                left: '42%', 
                width: '8%', 
                height: '45%', 
              }}>
              </Link>

              {/* Times */}
              <Link to={auth?"/equipe":"/login"} style={{
                position: 'absolute',
                top: '20%', 
                left: '50%', 
                width: '8%', 
                height: '45%', 
              }}>
              </Link>

              {/* Contratos */}
              <Link to={auth?"/contrato":"/login"} style={{
                position: 'absolute',
                top: '20%', 
                left: '58%', 
                width: '10%', 
                height: '45%', 
              }}>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
