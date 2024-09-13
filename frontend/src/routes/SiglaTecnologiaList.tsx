import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TableGrid from '../components/TableGrid';
import Loading from '../components/Loading';
import {AuthContext} from '../contexts/AuthContext';
import requestWithToken from '../services/apiService';

export default function SiglaTecnologiaList({title}) {

  const navigate = useNavigate();

  // Informe aqui o título do Grid.
  const tituloLista = title;

  // Informe aqui a URL de consulta dos itens que serão listados no Grid.
  const urlLista = "https://jsonplaceholder.typicode.com/posts"
  
  // Informe aqui a rota que será usada para edição. Ex: https://localhost/funcionalidade1/id a rota será "funcionalidade1".
  const rota = "siglatecnologia"
  const tituloRota = "Siglas-Tecnologias"
  const qtdeLinhasGrid = 5
  
  // Informe aqui os nomes dos títulos das colunas e tamanho no Grid.
  // O identificador (id) não precisa ser informado, mas precisa existir na lista de Itens.
  // O total de colunas é col-12, ou seja, a soma das colunas tem que dar 12. Exemplo: (col-3, col-6, col-3)
  const colunas = [
    { titulo: 'ID', campo: 'id', tamanho: 'col-1', pesquisa: false  },
    { titulo: 'Tecnologia', campo: 'title', tamanho: 'col-11', pesquisa: true  }
  ]

  // Informe aqui os botões (ações) que serão exibidos no GRID.
  const acoes = [
    { 
      label: 'Editar', 
      icone: 'fa-edit',
      acao: (id) => navigate(`/SiglaTecnologia/${id}`)
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

