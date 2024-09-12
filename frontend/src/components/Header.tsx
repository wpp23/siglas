import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import htmlParse from 'html-react-parser';
import MenuFlutuante from './MenuFlutuante';
import {AuthContext} from '../contexts/AuthContext'
import jsonData  from '../menuItens.json';
import mainLogo from '../images/logo_govbr.png';

export default function Header({title,subtitle}) {

    const navigate = useNavigate(); // Inicialize o useNavigate
    const [selectedOption, setSelectedOption] = useState(null);
    const [hiddenMenuLogin, setHiddenMenuLogin] = useState(true);
    const {auth} = useContext(AuthContext); // autenticado?

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        // Abrir a URL no navegador
        navigate(selectedOption.value);
    }

 
    function flattenList(data) {
      let result = [];
      data.forEach(item => {
          if (Array.isArray(item.list)) {
              result = [...result, ...flattenList(item.list)];
          } else if (item.url) {
              result.push(item);
          }
      });
      return result;
    }
  
    
    const options = flattenList(auth?jsonData:[''])
    .map(item => ({
      value: item.url,
      label: htmlParse(
        `<i className='fas fa-${item.icon}' aria-hidden='true'></i> ${item.name}`
      ),
    }));

    const customControlStyles = base => ({
      ...base,
      width: '300px', // Defina a largura desejada
      height: 30, // Defina a altura desejada
    });
    

    return (
        <header className="br-header mb-1" id="header" data-sticky="data-sticky">
          <div className="container-fluid">
            <div className="header-top">
              <div className="header-logo"><Link to="/">
                <img src={mainLogo} alt="" /></Link>
                <span className="br-divider vertical mx-half mx-sm-1"></span>
                <div className="header-sign">
                  &nbsp;&nbsp;Ministério da Educação
                </div>
              </div>
              <div className="header-actions">
                <div className="header-links dropdown">
                  <button className="br-button circle small" type="button" data-toggle="dropdown" aria-label="Abrir Acesso Rápido"><i className="fas fa-ellipsis-v" aria-hidden="true"></i>
                  </button>
                  <div className="br-list">
                    <div className="header">
                      <div className="title">Acesso Rápido</div>
                    </div>
                    <a className="br-item" target="_blank" href="https://www.gov.br/pt-br/orgaos-do-governo">Órgãos do Governo</a>
                    <a className="br-item" target="_blank" href="https://www.gov.br/acessoainformacao/pt-br">Acesso à Informação</a>
                    <a className="br-item" target="_blank" href="http://www4.planalto.gov.br/legislacao/">Legislação</a>
                    <a className="br-item" target="_blank" href="https://www.gov.br/governodigital/pt-br/acessibilidade-digital">Acessibilidade</a>
                  </div>
                </div><span className="br-divider vertical mx-half mx-sm-1"></span>
                <div className="header-functions dropdown">
                  <button className="br-button circle small" type="button" data-toggle="dropdown" aria-label="Abrir Funcionalidades do Sistema"><i className="fas fa-th" aria-hidden="true"></i>
                  </button>
                  <div className="br-list">
                    <div className="header">
                      <div className="title">Funcionalidades do Sistema</div>
                    </div>
                    <div className="align-items-center br-item">
                      <button className="br-button circle small" type="button" aria-label="Funcionalidade 1"><i className="fas fa-chart-bar" aria-hidden="true"></i><span className="text">Funcionalidade 1</span>
                      </button>
                    </div>
                    <div className="align-items-center br-item">
                      <button className="br-button circle small" type="button" aria-label="Funcionalidade 2"><i className="fas fa-headset" aria-hidden="true"></i><span className="text">Funcionalidade 2</span>
                      </button>
                    </div>
                    <div className="align-items-center br-item">
                      <button className="br-button circle small" type="button" aria-label="Funcionalidade 3"><i className="fas fa-comment" aria-hidden="true"></i><span className="text">Funcionalidade 3</span>
                      </button>
                    </div>
                    <div className="align-items-center br-item">
                      <button className="br-button circle small" type="button" aria-label="Funcionalidade 4"><i className="fas fa-adjust" aria-hidden="true"></i><span className="text">Funcionalidade 4</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="header-search-trigger">
                  <button className="br-button circle" type="button" aria-label="Abrir Busca" data-toggle="search" data-target=".header-search"><i className="fas fa-search" aria-hidden="true"></i>
                  </button>
                </div>
                <div className="header-login">
                  <div className="header-sign-in">
                    {!auth?
                      <button className="br-button sign-in small" type="button" data-trigger="login" onClick={()=>(location.href = "/Login")}>
                        <i className="fas fa-user" aria-hidden="true"></i>
                        <span className="d-sm-inline">Entrar</span>
                      </button>
                    :
                    <div  style={{ border:0, position: 'relative', zIndex: 10}}>
                      <button className="br-sign-in" type="button" id="avatar-dropdown-trigger" data-toggle="dropdown" data-target="avatar-menu" aria-label="Olá, Fulano" onClick= {()=>setHiddenMenuLogin(!hiddenMenuLogin)}>
                        <span className="br-avatar" title="Fulano da Silva">
                          <span className="content bg-orange-vivid-30 text-pure-0">F</span>
                        </span>
                        <span className="ml-2 text-gray-80 text-weight-regular">
                          Olá, <span className="text-weight-semi-bold">Fulano</span>
                        </span>
                        <i className="fas fa-caret-down" aria-hidden="true"></i>
                      </button>
                      <div className="br-list" id="avatar-menu" hidden={hiddenMenuLogin} role="menu" aria-labelledby="avatar-dropdown-trigger">
                        <Link to={"/login"} className="br-item" role="menuitem"> 
                          <i className="fas fa-user"></i>&nbsp;&nbsp;Dados do usuário
                        </Link> 
                        <Link to={"/login"} className="br-item"> 
                          <i className="fas fa-share"></i>&nbsp;&nbsp;Sair da Conta
                        </Link> 
                      </div>
                    </div>
                    }
                  </div>
                  <div className="header-avatar d-none">
                    <div className="avatar dropdown"><span className="br-avatar" title="Fulana da Silva"><span className="image"><img src="" alt="Avatar" /></span></span>
                      <button className="br-button circle small" type="button" aria-label="Abrir Menu de usuário" data-toggle="dropdown"><i className="fas fa-angle-down" aria-hidden="true"></i>
                      </button>
                      <div className="br-notification">
                        <div className="notification-header">
                          <div className="row">
                            <div className="col-10"><span className="text-bold">Fulano da Silva</span><br /><small>nome.sobrenome@dominio.gov</small></div>
                          </div>
                        </div>
                        <div className="notification-body">
                          <div className="br-tab">
                            <nav className="tab-nav" react-style="--height-nav:0px; --right-gradient-nav:-1px;">
                              <ul>
                                <li className="tab-item">
                                  <button type="button" data-panel="notification-panel-1-82869"><span className="name"><span className="d-flex flex-column flex-sm-row"><span className="icon mb-1 mb-sm-0 mr-sm-1"><i className="fas fa-image" aria-hidden="true"></i></span><span className="name">Item</span></span></span></button>
                                </li>
                                <li className="tab-item active">
                                  <button type="button" data-panel="notification-panel-2-82869"><span className="name"><span className="d-flex flex-column flex-sm-row"><span className="icon mb-1 mb-sm-0 mr-sm-1"><i className="fas fa-image" aria-hidden="true"></i></span><span className="name">Item</span></span></span></button>
                                </li>
                              </ul>
                            </nav>
                            <div className="tab-content">
                              <div className="tab-panel" id="notification-panel-1-82869">
                                <div className="br-list">
                                  <button className="br-item" type="button"><i className="fas fa-heartbeat" aria-hidden="true"></i>Link de Acesso
                                  </button><span className="br-divider"></span>
                                  <button className="br-item" type="button"><i className="fas fa-heartbeat" aria-hidden="true"></i>Link de Acesso
                                  </button><span className="br-divider"></span>
                                  <button className="br-item" type="button"><i className="fas fa-heartbeat" aria-hidden="true"></i>Link de Acesso
                                  </button>
                                </div>
                              </div>
                              <div className="tab-panel active" id="notification-panel-2-82869">
                                <div className="br-list">
                                  <button className="br-item" type="button"><span className="br-tag status small warning"></span><span className="text-bold">Título</span><span className="text-medium mb-2">25 de out</span><span>Nostrud consequat culpa ex mollit aute. Ex ex veniam ea labore laboris duis duis elit. Ex aute dolor enim aute Lorem dolor. Duis labore ad anim culpa. Non aliqua excepteur sunt eiusmod ex consectetur ex esse laborum velit ut aute.</span>
                                  </button><span className="br-divider"></span>
                                  <button className="br-item" type="button"><span className="text-bold">Título</span><span className="text-medium mb-2">24 de out</span><span>Labore nulla elit laborum nulla duis. Deserunt ad nulla commodo occaecat nulla proident ea proident aliquip dolore sunt nulla. Do sit eu consectetur quis culpa. Eiusmod minim irure sint nulla incididunt occaecat ipsum mollit in ut. Minim adipisicing veniam adipisicing velit nostrud duis consectetur aute nulla deserunt culpa aliquip.</span>
                                  </button><span className="br-divider"></span>
                                  <button className="br-item" type="button"><span className="br-tag status small warning"></span><span className="text-bold">Título</span><span className="text-medium mb-2">03 de out</span><span>Duis qui dolor dolor qui sint consectetur. Ipsum eu dolore ex anim reprehenderit laborum commodo. Labore do ut nulla eiusmod consectetur.</span>
                                  </button><span className="br-divider"></span>
                                  <button className="br-item" type="button"><span className="text-bold">Título</span><span className="text-medium mb-2">16 de mai</span><span>Sunt velit dolor enim mollit incididunt irure est. Ad ea Lorem culpa quis occaecat sunt in exercitation nisi. Sit laborum laborum dolor culpa ipsum velit. Non nulla nisi dolore et anim consequat officia deserunt amet qui. Incididunt exercitation irure labore ut Lorem culpa. Dolore ea irure pariatur ullamco culpa veniam amet dolor in fugiat pariatur ut. Sit non ut enim et incididunt tempor irure pariatur ex proident labore cillum dolore nisi.</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="header-bottom">
              <div className="header-menu">
                <div className="header-menu-trigger">
                    <button className="br-button small circle" disabled={!auth} type="button" aria-label="Menu" data-toggle="menu" data-target="#main-navigation" id="navigation"><i className="fas fa-bars" aria-hidden="true"></i>
                    </button>
                </div>
                <div className="header-info">
                  <div className="header-title"><b>{title}</b></div>
                  <div className="header-subtitle">{subtitle}</div>
                </div>
              </div>
              <div className="header-search">
                <div className="br-input-group">
                  <Select 
                        value={selectedOption}
                        onChange={handleSelectChange}
                        options={options}
                        styles={{ control: customControlStyles }}
                        placeholder={htmlParse(
                          "<i className='fas fa-search' aria-hidden='true'></i>   O que você procura?"
                        )}
                        className="br-select-search"
                        classNamePrefix="select"
                    />
                </div>
              </div>
            </div>
          </div>
          <MenuFlutuante title={title}></MenuFlutuante>
        </header>
    );
}
