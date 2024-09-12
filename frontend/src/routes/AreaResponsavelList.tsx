import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TableGrid from '../components/TableGrid';
import Loading from '../components/Loading';
import {AuthContext} from '../contexts/AuthContext';
import requestWithToken from '../services/apiService';
import { Link } from 'react-router-dom';

export default function AreaResponsavelList() {

  const navigate = useNavigate();

  // Título do Grid
  const tituloLista = "Áreas Responsáveis"

  // URL de consulta dos itens
  const urlLista = "arearesponsavel"
  
  // Rota para edição
  const rota = "arearesponsavel" 
  const tituloRota = "Áreas Responsáveis"
  const qtdeLinhasGrid = 10
  
  // Definição das colunas do Grid
  const colunas = [
    { titulo: 'ID', campo: 'idarearesponsavel', tamanho: 'col-1', pesquisa: false  },
    { titulo: 'Área', campo: 'siglaarea', tamanho: 'col-2', pesquisa: true  },   
    { titulo: 'Descrição', campo: 'descrarea', tamanho: 'col-7', pesquisa: true  }   
  ]

  // Botões de ação no Grid
  const acoes = [
    { 
      label: 'Editar', 
      icone: 'fa-edit',
      acao: (id) => navigate(`/AreaResponsavel/${id}`) 
    }
  ];
   
/////////////////////////////////////////

  /////////////////////////////////////////

  /////////////////////////////////////////
  //Deste ponto em diante não é necessária nenhuma intervenção no código, caso necessite, verificar com a equipe da arquitetura.
  /////////////////////////////////////////

  /////////////////////////////////////////

  /////////////////////////////////////////

  /////////////////////////////////////////

  /////////////////////////////////////////

  const [itensLista, SetItensLista] = useState([]); 
  const [isLoading, SetIsLoading] = useState(true);
  const [error, SetError] = useState<string | null>(null);
  
  const { auth, token } = useContext(AuthContext); // Get the token

  //Verifica se está autenticado
  if (!auth){
    navigate("/login");
  }

  //Recupera a lista da URL informada na urlLista.
  useEffect(()=>{
      const FetchItens = async() => {

          let timeoutId;

          try {
              
              // Inicia um temporizador, caso a consulta demore mais que o tempo definido abaixo, exibe o erro.
              // Para evitar que a aplicação fique aguardando ad-eternum uma requisição.
              timeoutId = setTimeout(() => {
                  SetIsLoading(false);
                  SetError('A solicitação demorou demais para responder.');
              }, 15000); // 15000 ms = 15 segundos
  
              //const resposta = await apiService.get(urlLista)
              const response = await requestWithToken({
                method: 'GET', 
                url: urlLista, 
              }, token)        
              .then(resposta => {
                // Limpa o temporizador se a solicitação for bem-sucedida
                clearTimeout(timeoutId);
    
                //Verifica se o JSON possui o campo value - formato oData do Olinda.
                SetItensLista(resposta.data.hasOwnProperty('value') ? resposta.data.value : resposta.data);
                SetIsLoading(false);

              })
              .catch(error => {
                clearTimeout(timeoutId);
                SetIsLoading(false);
                SetError(`Não foi possível recuperar os dados. - ${error}`);
                console.log(error);
              });

          } catch (error) {
              clearTimeout(timeoutId);
              SetIsLoading(false);
              SetError(`Não foi possível recuperar os dados. - ${error}`);
              console.log(error);
          }
      }
      FetchItens()
  }, [token])

        return (
          <main className="d-flex flex-fill" id="main">
                <div className="container-fluid">
                  {error && (
                    <br-message state="danger" title="Atenção." show-icon="true" message={error}></br-message>
                  )}

                <nav className="br-breadcrumb" aria-label="Breadcrumbs">
                  <ol className="crumb-list" role="list">
                    <li className="crumb home"><Link to="/" className="br-button circle"><span className="sr-only">Página inicial</span><i className="fas fa-home"></i></Link></li>
                    <li className="crumb" data-active="active"><i className="icon fas fa-chevron-right"></i><span tabIndex={0} aria-current="page">{tituloRota}</span>
                    </li>
                  </ol>
                </nav>

                  {isLoading ? (
                    <Loading />
                  ) : (
                    <TableGrid
                      itens={itensLista}
                      colunas={colunas}
                      acoes={acoes}
                      titulo={tituloLista}
                      rota={rota}
                      qtdeItensIni={qtdeLinhasGrid}
                    />
                  )}

                </div>
          </main>
        );
}


