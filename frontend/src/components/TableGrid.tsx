import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Pagination from "./Pagination";
import * as XLSX from "xlsx";

interface Item {
  id: number; // obrigatório ter um campo ID.
}
interface Acoes {
  label: string;
  icone: string;
}
interface Column {
  titulo: string;
  campo: string;
  tamanho: string;
  pesquisa?: boolean; // Add pesquisa property to Column interface
}

interface Props {
  titulo: string;
  colunas: Column[];
  itens: Item[];
  acoes: Acoes[];
  rota: string;
  qtdeItensIni: number;
}

// função que realiza a pesquisa nos itens do grid
function pesquisarItens(listaItens: Item[], pesquisa: string, colunas: Column[]): Item[] {
  // Se a lista de itens estiver vazia, retorna uma lista vazia
  if (listaItens.length === 0) {
    return [];
  }

  // Filtra as colunas que têm o campo pesquisa igual a true
  const colunasPesquisa = colunas.filter((coluna) => coluna.pesquisa);

  // Filtra os itens com base no texto de pesquisa
  return listaItens.filter((item) => {
    return colunasPesquisa.some((coluna) => {
      const campo = item[coluna.campo];
      return campo && campo.toString().toLowerCase().includes(pesquisa.toLowerCase());
    });
  });
}

//função para exportar os itens do Json para o excel.
function exportToExcel(data: Item[]) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const fileName = "arquivoExcel";

  // Salva o arquivo
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

export default function TableGrid({ titulo, colunas, itens, acoes, rota, qtdeItensIni,}: Props): JSX.Element {

  const location = useLocation();
  const currentPath = location.pathname; 

  // Definição das variáveis
  const [itensPerPage, SetItensPerPage] = useState(qtdeItensIni);
  const [currentPage, SetCurrentPage] = useState(0);
  const [pages, SetPages] = useState(Math.ceil(itens.length / itensPerPage));
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const [searchString, setSearchString] = useState("");

  //Menu de opções
  const [showOptions, setShowOptions] = useState(false);
  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  // Chama a função pesquisarItens para obter os itens filtrados
  const totalItensFiltered = itens.length > 0 ? pesquisarItens(itens, searchString, colunas):[]; 
  const itensFiltrados = totalItensFiltered.slice(startIndex, endIndex);

  // Função de ordenação das colunas asc/desc ao clicar no mome da coluna
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...itensFiltrados];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [itensFiltrados, sortConfig]);

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  //Se houver mudança na qtde Itens/Pagina ou pesquisa retorna sempre pra pagina inicial.
  useEffect(() => {
    const pagesFiltered = Math.ceil(totalItensFiltered.length / itensPerPage);
    SetPages(pagesFiltered > 0 ? pagesFiltered : 1);
    SetCurrentPage(0);
  }, [itensPerPage, searchString]);

  return (
    <div className="row">
      <div className="col" id="main-content">
        <div className="br-table small" data-search={true}>
          <div className="table-header">
            <div className="top-bar">
              <div className="table-title p-1">{titulo}</div>
              <div>{searchString.length != 0 ? totalItensFiltered.length + "/" + itens.length : itens.length>0?itens.length:0} registro(s)&nbsp;&nbsp;</div>
              <div>
                <div className="br-input small input-button">
                  <div>
                  {sortedItems.length > 0 || searchString != ""? (
                    <div className="br-input input-highlight col-12 align-right">
                      <input id="txtPesquisa" type="text" placeholder="Pesquisar" value={searchString} onChange={(e) => setSearchString(e.target.value)} />
                      <button className="br-button" type="button" aria-label="Pesquisar" title="Pesquisar" onClick={(e) => setSearchString("")}>
                        <i className={searchString === "" ? "fas fa-search" : "fas fa-eraser"} aria-hidden="true"></i>
                      </button>
                    </div>):null
                    };
                  </div>
                </div>
              </div>
              <div className="actions-trigger text-nowrap">
                <div className="header-links dropdown">
                  <button
                    className="br-button circle"
                    type="button"
                    id="button-dropdown"
                    title="Ver opções"
                    data-toggle="dropdown"
                    data-target="target01-98928"
                    aria-label="Opções"
                    aria-haspopup="true"
                    aria-live="polite"
                    data-visible="true"
                    aria-expanded={showOptions}
                    aria-controls="target01-98928"
                    tabIndex={0}
                    onClick={handleButtonClick}
                  >
                    <i className="fas fa-ellipsis-v fa-chevron-up" aria-hidden="true"></i>
                  </button>
                  {showOptions && (
                    <div className="br-list" id="target01-98928" role="menu" aria-labelledby="button-dropdown" aria-hidden="false" data-dropdown>
                      <div className="header">
                        <div className="title">Opções</div>
                      </div>
                      <Link className="br-item" to={`${currentPath}/0`}> 
                        <i className="fas fa-plus"></i>&nbsp;&nbsp;Novo
                      </Link> 
                      <span className="br-divider vertical mx-half mx-sm-1"></span>
                      <button className="br-item" onClick={() => exportToExcel(totalItensFiltered)}>
                        <i className="fas fa-share-square"></i>&nbsp;&nbsp;Exportar Excel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {sortedItems.length > 0 ? (
            <table>
              <thead>
                <tr key={-1}>
                  {colunas.map((coluna, index) => (
                    index === 0 ? (
                      <th key={index} className="col-1" style={{ fontWeight: "bold" }}>
                        Ações
                      </th>
                    ) : (
                      <th key={index} className={coluna.tamanho} style={{ cursor: "pointer", fontWeight: "bold" }} onClick={() => requestSort(coluna.campo)}>
                        {coluna.titulo}
                        {sortConfig && sortConfig.key === coluna.campo && (sortConfig.direction === "ascending" ? <i className="fas fa-sort-down"></i> : <i className="fas fa-sort-up"></i>)}
                      </th>
                    )
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedItems.map((item, index) => (
                  <tr key={index}>
                    {colunas.map((coluna, colIndex) => (
                    <td key={colIndex}>
                      {colIndex === 0 ? (
                        acoes.map((acao, acaoIndex) => (
                          <button 
                            className="br-button circle small" 
                            key={acaoIndex} 
                            title={acao.label} 
                            onClick={() => { 
                              acao.acao(item[coluna.campo]); 
                            }}
                          >
                            <i className={`fas ${acao.icone}`} aria-hidden="true" aria-label={acao.label}></i>
                          </button>
                        ))
                      ) : (
                        item[coluna.campo]
                      )}
                    </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="br-alert warning" style={{textAlign: 'center'}}>
              <div className="alert-header">
                <div className="title"><br/><br/><br/><i className="fas fa-exclamation-triangle"></i> Nenhum registro encontrado.</div>
              </div>
            </div>
          )}

        {sortedItems.length > 0 ? (
          <Pagination itensTotal={totalItensFiltered.length} pages={pages} currentPage={currentPage} SetCurrentPage={SetCurrentPage} itensPerPage={itensPerPage} SetItensPerPage={SetItensPerPage} />
        ): null};
        </div>
      </div>
    </div>
  );
}
