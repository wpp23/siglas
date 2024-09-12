import React, { useContext, useRef } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import mainLogo from '../images/logo_govbr.png';
import jsonData from '../menuItens.json'
import { AuthContext } from '../contexts/AuthContext';


export default function MenuFlutuante({ title }) {

    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    //Verifica se está autenticado
    if (!auth) {
      navigate('/login');
    }

    // Create a ref to the menu container
    const menuContainerRef = useRef<HTMLDivElement>(null);

    // Função para montar os itens do menu com base no arquivo JSON
    function montarItensDoMenu(jsonData) {
      // Iterar sobre cada objeto no JSON
      const menuItems = jsonData.map((item,index) => {
        const { id, icon, name, list, url, target } = item;
        // Verificar se o item possui uma lista de subníveis
        if (list && list.length > 0) {
          const subItems = montarItensDoMenu(list); // Recursivo subníveis
          return (
            <div className="menu-folder drop-menu" key={index}>
              <a className="menu-item" href="#" onClick={(e)=>e.preventDefault()}>
                <span className="icon">
                  <i className={`fas fa-${icon}`} aria-hidden="true"></i>
                </span>
                <span className="content">{name}</span>
              </a>
              <ul>{subItems}</ul>
            </div>
          );
        } else {
          // Use <a> for external links ("_blank")
          return (
            <li key={index}>
              {target === '_blank' ? (
                <a 
                  className="menu-item" 
                  href={url} 
                  target="_blank"
                  rel="noopener noreferrer" // Add rel for security
                  onClick={() => {
                    // Close the menu after clicking the Link
                    if (menuContainerRef.current) {
                      menuContainerRef.current.classList.remove('active'); 
                    }
                  }}
                >
                  <span className="icon">
                    <i className={`fas fa-${icon}`} aria-hidden="true"></i>
                  </span>
                  <span className="content">{name}</span>
                </a>
              ) : (
                // Use Link for internal navigation
                <Link 
                    className="menu-item" 
                    to={url}
                    onClick={() => {
                      // Close the menu after clicking the Link
                      if (menuContainerRef.current) {
                        menuContainerRef.current.classList.remove('active'); 
                      }
                    }}
                  >
                  <span className="icon">
                    <i className={`fas fa-${icon}`} aria-hidden="true"></i>
                  </span>
                  <span className="content">{name}</span>
                </Link>
              )}
            </li>
          );
        };
      });
  
      return menuItems;
    }

    // Renderizar os itens do menu

    return <div className="br-menu" id="main-navigation" ref={menuContainerRef}>
      <div className="menu-container">
        <div className="menu-panel col-sm-4 col-lg-3">
          <div className="menu-header">
            <div className="menu-title"><a href="/"><img src={mainLogo} alt="Imagem ilustrativa" /></a><span>&nbsp;&nbsp;{title}</span></div>
            <div className="menu-close">
              <button className="br-button circle" type="button" aria-label="Fechar o menu" data-dismiss="menu"><i className="fas fa-times" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <nav className="menu-body">
                <ul>
                    <li>
                      <Link to={"/"} className="menu-item"
                        onClick={() => {
                          // Close the menu after clicking the Link
                          if (menuContainerRef.current) {
                            menuContainerRef.current.classList.remove('active'); 
                          }
                        }}>
                            <span className="icon">
                            <i className="fas fa-home" aria-hidden="true"></i>
                            </span>
                            <span className="content">Início</span>
                      </Link>
                    </li>
                    {montarItensDoMenu(jsonData)}
                </ul>
            </nav>
            <Outlet />
        </div>
        <div className="menu-scrim" data-dismiss="menu" tabIndex={0}></div>
      </div>
    </div>

} 

