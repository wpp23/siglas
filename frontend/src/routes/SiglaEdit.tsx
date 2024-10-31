import React, { useEffect, useState, useRef, useContext } from 'react'; 
import { useForm } from 'react-hook-form';
import { useParams, Outlet, Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import requestWithToken from '../services/apiService';
import {AuthContext} from '../contexts/AuthContext';
import { HTMLMainElement } from 'dom'; 
import OptionsMenu from '../components/OptionsMenu'; 
import SelectGrid from '../components/SelectGrid';
import ErrorDisplayField from '../components/ErrorDisplayField';
import { formatDate } from '../components/DateUtils';
import TecnologiaSiglaList from './TecnologiaSiglaList';

interface SiglaData {
  sigla: string;
  descricaosigla: string;
  idsiglapai: number | null;
  idtiposigla: number | null;
  idarearesponsavel: number | null;
  idsituacaosigla: number | null;
  dataproducao: Date | null;
  datainativacao: Date | null;
  obssigla: string | null;
  siglacritica: boolean | false;
  gov_clientid: string | null;
  gov_scopes: string | null;
  gov_redirecturi: string | null;
}

const rotaFront = '/sigla'; 
const rotaDefault = '/sigla'; // Define a rota padrão do backend


export default function SiglaEdit() {

  const { register, handleSubmit, setValue, control, formState: { errors = {} } } = useForm<SiglaData>({
    defaultValues: {
      sigla: '',
      descricaosigla: '',
      idsiglapai: null,
      idtiposigla: null,
      idarearesponsavel: null,
      idsituacaosigla: null,
      dataproducao: null,
      datainativacao: null,
      obssigla: null,
      siglacritica: false,
      gov_clientid: null,
      gov_scopes: null,
      gov_redirecturi: null,
    },
  });
 
  const { auth, token } = useContext(AuthContext); // Acesse o token do contexto
  const navigate = useNavigate();

  //Verifica se está autenticado
  if (!auth){
    navigate("/login");
  }

  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams<{ id: string }>();
  const [id, setId] = useState(Number(params.id));
  const [sigla, setSigla] = useState<string>(''); 

  // Create a ref to access the main element
  const mainRef = useRef<HTMLMainElement>(null);

  //Caixas de Seleção
  const [siglaPai, setSiglaPai] = useState([]);
  const [tipoSigla, setTipoSigla] = useState([]);
  const [areaResponsavel, setAreaResponsavel] = useState([]);
  const [situacaoSigla, setSituacaoSigla] = useState([]);

  // Função do delete
  async function handleExcluir(id: number) {
    if (confirm('Você tem certeza que deseja excluir este registro?')) {
      try {
        await requestWithToken( // Use requestWithToken aqui
          {
            method: 'DELETE',
            url: `${rotaDefault}/${id}`,
          },
          token // Passe o token para a função
        );
        setSuccess(true);
        setMsg('O registro foi excluído.');
        limparCampos();
      } catch (error) {
        setSuccess(false);
        setMsg(`Não foi possível excluir o registro. ID: ${id} - ${error}`);
      }
    }
  }

  // Função de limpar os campos
  function limparCampos() {
    setId(0);
    setValue('sigla', '');
    setValue('descricaosigla', '');
    setValue('idsiglapai', null);
    setValue('idtiposigla', null);
    setValue('idarearesponsavel', null);
    setValue('idsituacaosigla', null);
    setValue('dataproducao', null);
    setValue('datainativacao', null);
    setValue('obssigla', null);
    setValue('siglacritica', false);
    setValue('gov_clientid', null);
    setValue('gov_scopes', null);
    setValue('gov_redirecturi', null);
  }

  // Recuperar os dados do Form
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {

        if (id > 0) {
          const response = await requestWithToken(
            {
              method: 'GET',
              url: `${rotaDefault}/${id}`,
            },token)
            .then((response) => {
            const {
              sigla,
              descricaosigla,
              idsiglapai,
              idtiposigla,
              idarearesponsavel,
              idsituacaosigla,
              dataproducao,
              datainativacao,
              obssigla,
              siglacritica,
              gov_clientid,
              gov_scopes,
              gov_redirecturi,
            } = response.data[0];

            setValue('sigla', sigla);
            setSigla(sigla);
            setValue('descricaosigla', descricaosigla);
            setValue('idsiglapai', idsiglapai);
            setValue('idtiposigla', idtiposigla);
            setValue('idarearesponsavel', idarearesponsavel);
            setValue('idsituacaosigla', idsituacaosigla);
            setValue('dataproducao', formatDate(dataproducao));
            setValue('datainativacao', formatDate(datainativacao));
            setValue('obssigla', obssigla);
            setValue('siglacritica', siglacritica);
            setValue('gov_clientid', gov_clientid);
            setValue('gov_scopes', gov_scopes);
            setValue('gov_redirecturi', gov_redirecturi);

          })
          .catch ( (error) => {
            setSuccess(false);
            setMsg(`Não foi possível recuperar os dados. ID: ${id} - ${error}`); 
          });
        } else {
          // Limpa os campos
          limparCampos();
        }

        //carrega as caixas de seleção

        //Fetch siglaPai options
        const siglaPaiResponse = await requestWithToken(
          {
            method: 'GET',
            url: 'sigla',
          }, token);
        if (siglaPaiResponse.data.length > 0) {
          setSiglaPai(siglaPaiResponse.data.map((item) => ({
            value: item.idsigla,
            label: item.sigla
          }))); 
        } else {
          setSiglaPai([]); // Se os dados forem vazios, define o array como vazio
        }

        //Tipo sigla
        const tipoSiglaResponse = await requestWithToken(
          {
            method: 'GET',
            url: 'tiposigla',
          }, token);
        if (tipoSiglaResponse.data.length > 0) {
          setTipoSigla(tipoSiglaResponse.data.map((item) => ({
            value: item.idtiposigla,
            label: item.descrtiposigla
          }))); 
        } else {
          setTipoSigla([]); // Se os dados forem vazios, define o array como vazio
        }

        //Area Responsavel
        const areaResponsavelResponse = await requestWithToken(
          {
            method: 'GET',
            url: 'arearesponsavel',
          }, token);
        if (areaResponsavelResponse.data.length > 0) {
          setAreaResponsavel(areaResponsavelResponse.data.map((item) => ({
            value: item.idarearesponsavel,
            label: item.siglaarea
          })));
        } else {
          setAreaResponsavel([]); // Se os dados forem vazios, define o array como vazio
        }

        //Situacao Sigla
        const situacaoSiglaResponse = await requestWithToken(
          {
            method: 'GET',
            url: 'situacaoSigla',
          }, token);
        if (situacaoSiglaResponse.data.length > 0) {
          setSituacaoSigla(situacaoSiglaResponse.data.map((item) => ({
            value: item.idsituacaosigla,
            label: item.descrsituacaosigla
          }))); 
        } else {
          setSituacaoSigla([]); // Se os dados forem vazios, define o array como vazio
        }


      } catch (error) {
        setMsg(`Não foi possível recuperar os dados. ID: ${id} - ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, setValue]);

  // Função de Submit do Form
  const onSubmit = async (data: SiglaData) => {
    try {

      if (id === 0) {
        const response = await requestWithToken( 
          {
            method: 'POST',
            url: rotaDefault,
            data: data, 
          }, token)        
        .then(response => {
            setId(response.data[0].id);
            setSuccess(true);
            setMsg('Os dados foram salvos.');
          })
        .catch(error => {
          setSuccess(false);
          setMsg(`Não foi possível salvar os dados. ID: ${id} - ${error}`);
        });
      } else {
        await requestWithToken( 
          {
            method: 'PUT',
            url: `${rotaDefault}/${id}`,
            data: data, 
          }, token);
        setSuccess(true);
        setMsg('Os dados foram atualizados.');
      }
    } catch (error) {
      setSuccess(false);
      setMsg(`Não foi possível ${id === 0 ? 'salvar' : 'atualizar'} os dados. ID: ${id} - ${error}`);
    }

    // Após salvar retorna para o topo do formulário
    setTimeout(() => {
      if (mainRef.current) {
        mainRef.current.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
      }
    }, 100); // Adjust the delay as needed, 1s in this case
    
  };



  // Validação do parametro id
  if (!Number.isInteger(id) || id < 0) {
    return (
      <br-message state="danger" closable title="Atenção." show-icon="true" message={"Parâmetro Inválido  ID: ${id}"+id}></br-message>
    );
  }

  return (
    <main className="d-flex flex-fill" id="main" ref={mainRef}>
      <div className="container-fluid">
        <div className="row">
          <div className="col mb-5 pt-1 pb-1">
            {success && msg !== null && (
              <br-message state="success" title="Sucesso." show-icon="true" message={msg}></br-message>
            )}
            {!success && msg !== null && (
              <br-message state="danger" title="Atenção." show-icon="true" message={msg}></br-message>
            )}

            <nav className="br-breadcrumb" aria-label="Breadcrumbs">
              <ol className="crumb-list" role="list">
                <li className="crumb home"><Link to="/" className="br-button circle"><span className="sr-only">Página inicial</span><i className="fas fa-home"></i></Link></li>
                <li className="crumb"><i className="icon fas fa-chevron-right"></i><Link to={rotaFront}>Siglas</Link>
                </li>
                <li className="crumb" data-active="active"><i className="icon fas fa-chevron-right"></i><span tabIndex={0} aria-current="page">Cadastro</span>
                </li>
              </ol>
            </nav>
          </div>

          <div className="row">
              <div className="col-sm-11 col-lg-11 mb-11">
                &nbsp;
              </div>
              <div className="actions-trigger text-nowrap">
                <div className="header-links dropdown align">
                  <button
                    className="br-button primary"
                    type="button"
                    id="button-dropdown"
                    title="Voltar para Lista"
                    data-toggle="dropdown"
                    data-target="target01-98928"
                    aria-label="Retornar para a Lista"
                    aria-haspopup="true"
                    aria-live="polite"
                    data-visible="true"
                    tabIndex={0}
                    onClick={()=>{navigate(rotaFront)}}
                  >
                    <i className="fas fa-chevron-left" aria-hidden="true"></i>
                    Voltar
                  </button>
                </div>
              </div>
              <div className="col-sm-1 col-lg-1 mb-1">
                <OptionsMenu
                  id={id}
                  onNewClick={() => setId(0)}
                  onDeleteClick={handleExcluir}
                />
              </div>
          </div>
          
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <br-tab label>
              <br-tab-item title="Sobre" is-active={true} id="panel-1" aria-label="Sobre">

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                      <div className="col pt-1 pb-1">
                          <div className="col-sm-4 col-md-4 col-lg-2">
                            <div className="br-input">
                              <label htmlFor="sigla">Sigla:</label>
                              <input
                                id="sigla"
                                type="text"
                                placeholder=""
                                {...register('sigla', { required: 'Campo Obrigatório.' })}
                              />
                              <ErrorDisplayField errors={errors} name="sigla" className="feedback danger" />                    
                            </div>
                          </div>

                          <div className="col-sm-12 col-md-10 col-lg-10">
                            <div className="br-textarea">
                              <label htmlFor="descricaosigla">Descrição detalhada:</label>
                              <textarea
                                id="descricaosigla"
                                rows={5}
                                placeholder="Digite aqui mais informações..."
                                {...register('descricaosigla', { required: 'Campo Obrigatório.' })}
                              ></textarea>
                              <ErrorDisplayField errors={errors} name="descricaosigla" className="feedback danger" />
                              <div className="text-base mt-1">
                                <span className="limit" aria-live="polite">
                                  Limite máximo de <strong>1000</strong> caracteres
                                </span>
                                <span className="current" aria-live="polite" role="status" id="limitmax"></span>
                              </div>
                            </div>
                          </div>
                      </div>
                  </div>
                  <p/>
                  <div className="row">
                    <div className="col-sm">
                          <div className="col-sm-12 col-md-6 col-lg-4">
                            <SelectGrid 
                              control={control} 
                              name="idsiglapai" 
                              options={siglaPai} 
                              label="Sigla Relacionada (Pai): (Opcional)" 
                            />
                          </div>
                          <div className="col-sm-12 col-md-6 col-lg-4">
                            <SelectGrid 
                                control={control} 
                                name="idtiposigla" 
                                options={tipoSigla} 
                                label="Tipo:" 
                                rules={{ required: 'Campo Obrigatório.' }}
                            />
                            <ErrorDisplayField errors={errors} name="idtiposigla" className="feedback danger" />                  
                          </div>
                          <div className="col-sm-12 col-md-6 col-lg-4">
                            <SelectGrid 
                                control={control} 
                                name="idarearesponsavel" 
                                options={areaResponsavel} 
                                label="Área Responsável:" 
                                rules={{ required: 'Campo Obrigatório.' }}
                            />
                            <ErrorDisplayField errors={errors} name="idarearesponsavel" className="feedback danger" />    
                          </div>
                    </div>
                  </div>
                  <br/>
                  <div className="row">
                    <div className="col pt-1 pb-1"> 
                          <div className="col-sm-4 col-md-4 col-lg-2">
                            <div className="br-input">
                              <label htmlFor="dataproducao">Data de Produção: (Opcional)</label>
                              <input
                                id="dataproducao"
                                type="date"
                                placeholder=""
                                {...register('dataproducao')}
                              />
                            </div>
                          </div>

                          <div className="col-sm-4 col-md-4 col-lg-2">
                            <div className="br-input">
                              <label htmlFor="datainativacao">Data de Inativação: (Opcional)</label>
                              <input
                                id="datainativacao"
                                type="date"
                                placeholder=""
                                {...register('datainativacao')}
                              />
                            </div>
                          </div>

                          <div className="col-sm-12 col-lg-2 mb-2">
                            <div className="br-checkbox">
                              <label htmlFor="siglacritica">Crítico:</label>
                              <input
                                id="siglacritica"
                                type="checkbox"
                                {...register('siglacritica')}
                              />
                            </div>
                          </div>

                          <legend>GOV.BR (Opcional)</legend>
                          <div className="col-sm-12 col-md-10 col-lg-6">
                            <div className="br-input">
                              <label htmlFor="gov_clientid">Client ID:</label>
                              <input
                                id="gov_clientid"
                                type="text"
                                placeholder=""
                                {...register('gov_clientid')}
                              />
                            </div>
                          </div>

                          <div className="col-sm-12 col-md-10 col-lg-6">
                            <div className="br-input">
                              <label htmlFor="gov_scopes">Scopes:</label>
                              <input
                                id="gov_scopes"
                                type="text"
                                placeholder=""
                                {...register('gov_scopes')}
                              />
                            </div>
                          </div>

                          <div className="col-sm-12 col-md-10 col-lg-6">
                            <div className="br-input">
                              <label htmlFor="gov_redirecturi">Redirect URI:</label>
                              <input
                                id="gov_redirecturi"
                                type="text"
                                placeholder=""
                                {...register('gov_redirecturi')}
                              />
                            </div>
                          </div>
                          <br/>
                          <br/>
                          <div className="col-sm-12 col-md-10 col-lg-10">
                            <div className="br-textarea">
                              <label htmlFor="obssigla">Observações gerais: (Opcional)</label>
                              <textarea
                                id="obssigla"
                                rows={5}
                                placeholder="Digite aqui mais informações..."
                                {...register('obssigla')}
                              ></textarea>
                            </div>
                          </div>
                          <br/>
                          <br/>
                          <div className="col-sm-12 col-md-6 col-lg-4">
                            <SelectGrid 
                                  control={control} 
                                  name="idsituacaosigla" 
                                  options={situacaoSigla} 
                                  label="Situação:" 
                                  rules={{ required: 'Campo Obrigatório.' }}
                            />
                            <ErrorDisplayField errors={errors} name="idsituacaosigla" className="feedback danger" />
                          </div>


                          <span className="br-divider my-3"></span>
                          <div className="d-flex mt-1 flex-row justify-content-center">
                            <Link to="/sigla" className="br-button mt-3 mt-sm-0 ml-sm-3">
                              Cancelar
                            </Link>
                            <input type="submit" className="br-button primary mt-3 mt-sm-0 ml-sm-3"/>
                          </div>
                          <p />
                    </div>
                  </div>
                </form>

              </br-tab-item>
              <br-tab-item title="Tecnologias" id="panel-1" aria-label="Tecnologias">
                <Link to={`/sigla/${id}/tecnologia`}>Tecnologias</Link>
                <Outlet /> 
              </br-tab-item>
              <br-tab-item title="Gestor(es)" id="panel-2" aria-label="Gestor(es)"><p>Gestor(es)</p>
                <Outlet /> 
              </br-tab-item>
              <br-tab-item title="Equipe Técnica" id="panel-3" aria-label="Equipe Técnica"><p>Equipe Técnica</p>
                <Outlet /> 
              </br-tab-item>
              <br-tab-item title="URLs" id="panel-4" aria-label="URLs"><p>URLs</p>
                <Outlet /> 
              </br-tab-item>
              <br-tab-item title="Bancos de Dados" id="panel-5" aria-label="Bancos de Dados"><p>Bancos de Dados</p>
                <Outlet /> 
              </br-tab-item>
              <br-tab-item title="Baseline" id="panel-6" aria-label="Baseline"><p>Baseline</p>
                <Outlet /> 
              </br-tab-item>
          </br-tab>

          </div>

        )}
       <Outlet />
      </div>

    </main>
  );
}
