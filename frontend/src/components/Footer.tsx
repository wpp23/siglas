import React from 'react';
import negativeLogo from '../images/govbr.svg';

export default function Footer() {  

        return <footer className="br-footer">
                <div className="container-lg">
                  <div className="logo"><img src={negativeLogo} alt="Imagem"/></div>
                  <div className="br-list horizontal" data-toggle="data-toggle" data-unique="data-unique">
                    <div className="col-2"><a className="br-item header" href="#" onClick={e => e.preventDefault()}>
                        <div className="content text-down-01 text-bold text-uppercase">GOVERNO FEDERAL</div>
                        <div className="support"><i className="fas fa-angle-up" aria-hidden="true"></i>
                        </div></a>
                      <div className="br-list"><span className="br-divider d-md-none"></span><a className="br-item" href="https://www.gov.br/pt-br/orgaos-do-governo">
                          <div className="content">Órgão do Governo</div></a><a className="br-item" href="https://www.gov.br/acessoainformacao/pt-br">
                          <div className="content">Acesso à Informação</div></a><a className="br-item" href="http://www4.planalto.gov.br/legislacao/">
                          <div className="content">Legislação</div></a><a className="br-item" href="https://www.gov.br/governodigital/pt-br/acessibilidade-digital">
                          <div className="content">Acessibilidade</div></a><span className="br-divider d-md-none"></span>
                      </div>
                    </div>
                    <div className="col-2"><a className="br-item header" href="#" onClick={e => e.preventDefault()}>
                        <div className="content text-down-01 text-bold text-uppercase">Categoria 2</div>
                        <div className="support"><i className="fas fa-angle-up" aria-hidden="true"></i>
                        </div></a>
                      <div className="br-list"><span className="br-divider d-md-none"></span><a className="br-item" href="#" onClick={e => e.preventDefault()}>
                          <div className="content">Ad deserunt nostrud</div></a><a className="br-item" href="#" onClick={e => e.preventDefault()}>
                          <div className="content">Ex qui laborum consectetur aute commodo</div></a><span className="br-divider d-md-none"></span>
                      </div>
                    </div>
                    <div className="col-2"><a className="br-item header" href="#" onClick={e => e.preventDefault()}>
                        <div className="content text-down-01 text-bold text-uppercase">Categoria 3</div>
                        <div className="support"><i className="fas fa-angle-up" aria-hidden="true"></i>
                        </div></a>
                      <div className="br-list"><span className="br-divider d-md-none"></span><a className="br-item" href="#" onClick={e => e.preventDefault()}>
                          <div className="content">Nulla occaecat eiusmod</div></a><a className="br-item" href="#" onClick={e => e.preventDefault()}>
                          <div className="content">Duis incididunt consectetur</div></a><a className="br-item" href="#" onClick={e => e.preventDefault()}>
                          <div className="content">Duis incididunt consectetur</div></a><a className="br-item" href="#" onClick={e => e.preventDefault()}>
                          <div className="content">Est ex deserunt</div></a><span className="br-divider d-md-none"></span>
                      </div>
                    </div>
                    <div className="col-2"><a className="br-item header" href="#" onClick={e => e.preventDefault()}>
                        <div className="content text-down-01 text-bold text-uppercase">Categoria 4</div>
                        <div className="support"><i className="fas fa-angle-up" aria-hidden="true"></i>
                        </div></a>
                      <div className="br-list"><span className="br-divider d-md-none"></span><a className="br-item" href="#" onClick={e => e.preventDefault()}>
                          <div className="content">Qui esse</div></a><a className="br-item" href="#" onClick={e => e.preventDefault()}>
                          <div className="content">Duis incididunt consectetur</div></a><a className="br-item" href="#" onClick={e => e.preventDefault()}>
                          <div className="content">Qui esse</div></a><a className="br-item" href="#" onClick={e => e.preventDefault()}>
                          <div className="content">Ex qui laborum consectetur aute commodo</div></a><span className="br-divider d-md-none"></span>
                      </div>
                    </div>
                    <div className="col-2"><a className="br-item header" href="#" onClick={e => e.preventDefault()}>
                        <div className="content text-down-01 text-bold text-uppercase">Categoria 5</div>
                        <div className="support"><i className="fas fa-angle-up" aria-hidden="true"></i>
                        </div></a>
                      <div className="br-list"><span className="br-divider d-md-none"></span><a className="br-item" href="#" onClick={e => e.preventDefault()}>
                          <div className="content">Nulla occaecat eiusmod</div></a><a className="br-item" href="#" onClick={e => e.preventDefault()}>
                          <div className="content">Adipisicing culpa et ad consequat</div></a><a className="br-item" href="#" onClick={e => e.preventDefault()}>
                          <div className="content">Adipisicing culpa et ad consequat</div></a><a className="br-item" href="#" onClick={e => e.preventDefault()}>
                          <div className="content">Ex qui laborum consectetur aute commodo</div></a><span className="br-divider d-md-none"></span>
                      </div>
                    </div>
                    <div className="col-2"><a className="br-item header" href="#" onClick={e => e.preventDefault()}>
                        <div className="content text-down-01 text-bold text-uppercase">Categoria 6</div>
                        <div className="support"><i className="fas fa-angle-up" aria-hidden="true"></i>
                        </div></a>
                      <div className="br-list"><span className="br-divider d-md-none"></span><a className="br-item" href="#" onClick={e => e.preventDefault()}>
                          <div className="content">Ex qui laborum consectetur aute commodo</div></a><a className="br-item" href="#" onClick={e => e.preventDefault()}>
                          <div className="content">Ad deserunt nostrud</div></a><a className="br-item" href="#" onClick={e => e.preventDefault()}>
                          <div className="content">Ex qui laborum consectetur aute commodo</div></a><a className="br-item" href="#" onClick={e => e.preventDefault()}>
                          <div className="content">Adipisicing culpa et ad consequat</div></a><span className="br-divider d-md-none"></span>
                      </div>
                    </div>
                  </div>
                  <div className="d-none d-sm-block">
                    <div className="row align-items-end justify-content-between py-5">
                      <div className="col social-network">
                        <p className="text-up-01 text-extra-bold text-uppercase">Redes Sociais</p><a className="mr-3" href="#" onClick={e => e.preventDefault()}>
                          <img src="" alt="Imagem"/></a><a className="mr-3" href="#" onClick={e => e.preventDefault()}>
                          <img src="" alt="Imagem"/></a><a className="mr-3" href="#" onClick={e => e.preventDefault()}>
                          <img src="" alt="Imagem"/></a><a className="mr-3" href="#" onClick={e => e.preventDefault()}>
                          <img src="" alt="Imagem"/></a>
                      </div>
                      <div className="col assigns text-right"><img className="ml-4" src="" alt="Imagem"/><img className="ml-4" src="" alt="Imagem"/>
                      </div>
                    </div>
                  </div>
                </div><span className="br-divider my-3"></span>
                <div className="container-lg">
                  <div className="info">
                    <div className="text-down-01 text-medium pb-3">Texto destinado a exibição de informações relacionadas à&nbsp;<strong>licença de uso.</strong></div>
                  </div>
                </div>
              </footer>
}
