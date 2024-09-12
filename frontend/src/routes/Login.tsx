import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../contexts/AuthContext'

import mainLogo from '../images/logo_govbr.png'
import mecLogo from '../images/MEC_logotipo.png'
import { apiService } from '../services/apiService';
import Card from '../components/Card';


export default function Login({title}){

    //Rota de chamada do back-end LDAP
    const urlLista = "login"

    const [error, setError] = useState<string | null>(null);
    const {auth, setAuth, token, setToken} = useContext(AuthContext);
    setToken(null);
    setAuth(false);
    const navigate = useNavigate();

    const handleLDAP = async() => {
        const resposta = await apiService.post(urlLista)
        .then(resposta => {
            setToken(resposta.data.token);
            console.log("iduser",resposta.data.iduser);
            setAuth(true);
            setError(null);
            navigate("/");
        })
        .catch(error => {
            console.log(error);
            setToken(null);
            setAuth(false);
            navigate("/Login");
            setError(`Não foi possível conectar ao servidor. - ${error}`);
        });
    }

      return(
        <main className="d-flex flex-fill" id="main">
            <div className="container-fluid">
                <div className="row">
                    <div className="col pt-0 pb-5">
                        <div className="main-content pl-sm-3" id="main-content">
                            <p className="h3">Login</p>
                            <p>Bem-vindo ao sistema {title}, selecione uma das opções abaixo para realizar o seu acesso ao sistema do MEC:</p>
                            <span className="br-divider my-3"></span>
                        </div>
                    </div>
                </div>                
                <div className="row">
                    <div className="col pt-0 pb-5">
                        {error && (
                        <br-message state="danger" title="Atenção." show-icon="true" message={error}></br-message>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <Card title="Acesso gov.br">
                            <div className="card-content p-6">
                                <div className="card-img d-flex justify-content-center align-itens-center">
                                    <img src={mainLogo} alt="" width="270" className="img-fluid"/>
                                </div>
                                <div className='d-flex p-3 justify-content-center'>
                                    <p>Utilize sua conta de acesso aos sistemas do Governo Federal para realizar seu acesso.</p>
                                </div>
                                <div className="d-flex p-3 justify-content-center">
                                    <button className="br-sign-in primary" type="button" onClick={(e)=>(e.preventDefault)}>Entrar com&nbsp;<span className="text-black">gov.br</span>
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="col-md-3">
                        <Card title="Rede MEC">
                            <div className="card-content p-6">
                                <div className="card-img d-flex justify-content-center align-itens-center">
                                    <img src={mecLogo} alt="" width="125" className="img-fluid"/>
                                </div>
                                <div className="d-flex p-3 justify-content-center">
                                    <p>Acesso exclusivo para usuários internos da rede MEC.<br/><br/></p>
                                </div>
                                <div className="d-flex p-3 justify-content-center">
                                    <button className="br-sign-in primary" type="button" onClick={()=>handleLDAP()}>Entrar com&nbsp;<span className="text-black">MEC</span>
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
        )
}