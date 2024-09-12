import React, { Component } from 'react';
import negativeLogo from '../images/govbr.png';

export default function FooterSmall() {  
    return( 
        <footer className="br-footer" style={{ marginTop: 'auto' }}>
                <div className="logo">
                        <img src={negativeLogo}/>
                </div>
                <div className="logo text-center"><a href="https://www.gov.br/mec/pt-br" target="_blank">MEC - Ministério da Educação</a></div>
                <span className="br-divider mb-3"></span>
                <div className="text-down-01 text-medium pb-3 text-center"> <a href="https://www.gov.br/ds/home" target="_blank">O Padrão Digital de Governo</a> utiliza as licenças <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank">CC0 1.0 Universal</a> e <a href="https://mit-license.org/" target="_blank">MIT</a>. </div>
        </footer>
    )
}