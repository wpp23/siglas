import React, { useEffect, useState } from "react"

export default function Pagination({itensTotal, pages, currentPage, SetCurrentPage, itensPerPage, SetItensPerPage}){

    return(

        <div className="table-footer">
            <nav className="br-pagination">
            <div className="pagination-per-page">
                <div><label htmlFor="cboExibir">Exibir&nbsp;</label></div>
                <div>
                    <select id="cboExibir" className='br-item' value={itensPerPage} onChange={(e) => SetItensPerPage(Number(e.target.value))}>
                        {itensTotal>5?<option value={5}>5 registros</option>:""}
                        {itensTotal>10?<option value={10}>10 registros</option>:""}
                        {itensTotal>15?<option value={15}>15 registros</option>:""}
                        {itensTotal>30?<option value={30}>30 registros</option>:""}
                        {itensTotal>50?<option value={50}>50 registros</option>:""}
                        <option value={itensTotal}>Todos</option>
                        
                    </select>
                </div>
            </div>
            <span className="br-divider d-none d-sm-block mx-3"></span>
            <div className="pagination-arrows ml-auto ml-sm-0">
                <button className="br-button circle" aria-label="Voltar página" onClick={(e)=> SetCurrentPage(currentPage===0?0:currentPage-1)}><i className="fas fa-angle-left" aria-hidden="true"></i>
                </button>
                <button className="br-button circle" aria-label="Página seguinte" onClick={(e)=> SetCurrentPage(currentPage===pages-1?pages-1:currentPage+1)}><i className="fas fa-angle-right" aria-hidden="true"></i>
                </button>
            </div>
            <span className="br-divider d-none d-sm-block mx-3"></span>
            <div>
                {Array.from(Array(pages), (item, index) => {
                return <button key={index}  className={index=== currentPage?"br-button circle active":"br-button circle"} value={index} onClick={(e) => SetCurrentPage(Number(e.target.value))}>{index+1}</button>
                })}
            </div>
            </nav>
        </div>

  )
} 