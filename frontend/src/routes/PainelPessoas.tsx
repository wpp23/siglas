import React from 'react';
import { Link } from 'react-router-dom';

const tituloRota = "Painel de Pessoas STIC";

export default function PainelPessoas() {

    return <main className="d-flex flex-fill" id="main">
                  <div className="container-fluid">

                    <nav className="br-breadcrumb" aria-label="Breadcrumbs">
                      <ol className="crumb-list" role="list">
                        <li className="crumb home"><Link to="/" className="br-button circle"><span className="sr-only">Página inicial</span><i className="fas fa-home"></i></Link></li>
                        <li className="crumb" data-active="active"><i className="icon fas fa-chevron-right"></i><span tabIndex={0} aria-current="page">{tituloRota}</span>
                        </li>
                      </ol>
                    </nav>

                    <div className='align-items-center d-flex flex-column'>
                        <iframe title="SIGLAS-Pessoas" width="1200" height="740" src="https://app.powerbi.com/reportEmbed?reportId=0547f747-fbf2-4fdd-a179-0df866b9e07a&autoAuth=true&ctid=b8c25932-5e76-4b2b-9c53-d41745e9c92d" frameBorder="0" allowFullScreen={true}></iframe>
                    </div>

                  </div>
           </main>
            
}

