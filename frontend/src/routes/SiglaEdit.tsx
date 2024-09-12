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

interface SiglaData {
  siglasistema: string;
  descricaosistema: string;
  idsistemapai: number | null;
  idtiposistema: number | null;
  idarearesponsavel: number | null;
  idsituacaosistema: number | null;
  dataproducao: Date | null;
  datainativacao: Date | null;
  obssistema: string | null;
  sistemacritico: boolean | false;
  gov_clientid: string | null;
  gov_scopes: string | null;
  gov_redirecturi: string | null;
}

const rotaFront = '/sigla'; 
const rotaDefault = '/sistemasigla'; // Define a rota padrão do backend

export default function SiglaEdit() {

  const { register, handleSubmit, setValue, control, formState: { errors = {} } } = useForm<SiglaData>({
    defaultValues: {
      siglasistema: '',
      descricaosistema: '',
      idsistemapai: null,
      idtiposistema: null,
      idarearesponsavel: null,
      idsituacaosistema: null,
      dataproducao: null,
      datainativacao: null,
      obssistema: null,
      sistemacritico: false,
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
  // Create a ref to access the main element
  const mainRef = useRef<HTMLMainElement>(null);

  //Caixas de Seleção
  const [sistemaPai, setSistemaPai] = useState([]);
  const [tipoSistema, setTipoSistema] = useState([]);
  const [areaResponsavel, setAreaResponsavel] = useState([]);
  const [situacaoSistema, setSituacaoSistema] = useState([]);

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
    setValue('siglasistema', '');
    setValue('descricaosistema', '');
    setValue('idsistemapai', null);
    setValue('idtiposistema', null);
    setValue('idarearesponsavel', null);
    setValue('idsituacaosistema', null);
    setValue('dataproducao', null);
    setValue('datainativacao', null);
    setValue('obssistema', null);
    setValue('sistemacritico', false);
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
              siglasistema,
              descricaosistema,
              idsistemapai,
              idtiposistema,
              idarearesponsavel,
              idsituacaosistema,
              dataproducao,
              datainativacao,
              obssistema,
              sistemacritico,
              gov_clientid,
              gov_scopes,
              gov_redirecturi,
            } = response.data[0];

            setValue('siglasistema', siglasistema);
            setValue('descricaosistema', descricaosistema);
            setValue('idsistemapai', idsistemapai);
            setValue('idtiposistema', idtiposistema);
            setValue('idarearesponsavel', idarearesponsavel);
            setValue('idsituacaosistema', idsituacaosistema);
            setValue('dataproducao', formatDate(dataproducao));
            setValue('datainativacao', formatDate(datainativacao));
            setValue('obssistema', obssistema);
            setValue('sistemacritico', sistemacritico);
            setValue('gov_clientid', gov_clientid);
            setValue('gov_scopes', gov_scopes);
            setValue('gov_redirecturi', gov_redirecturi);

            console.log(response.data[0]);
            console.log(dataproducao);
            console.log("data formatada:",formatDate(dataproducao));
            console.log(datainativacao);

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

        //Fetch sistemaPai options
        const sistemaPaiResponse = await requestWithToken(
          {
            method: 'GET',
            url: 'sistemasigla',
          }, token);
        if (sistemaPaiResponse.data.length > 0) {
          setSistemaPai(sistemaPaiResponse.data.map((item) => ({
            value: item.idsistema,
            label: item.siglasistema
          }))); 
        } else {
          setSistemaPai([]); // Se os dados forem vazios, define o array como vazio
        }

        //Tipo Sistema
        const tipoSistemaResponse = await requestWithToken(
          {
            method: 'GET',
            url: 'tiposistema',
          }, token);
        if (tipoSistemaResponse.data.length > 0) {
          setTipoSistema(tipoSistemaResponse.data.map((item) => ({
            value: item.idtiposistema,
            label: item.descrtiposistema
          }))); 
        } else {
          setTipoSistema([]); // Se os dados forem vazios, define o array como vazio
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

        //Situacao Sistema
        const situacaoSistemaResponse = await requestWithToken(
          {
            method: 'GET',
            url: 'situacaosistema',
          }, token);
        if (situacaoSistemaResponse.data.length > 0) {
          setSituacaoSistema(situacaoSistemaResponse.data.map((item) => ({
            value: item.idsituacaosistema,
            label: item.descrsituacaosistema
          }))); 
        } else {
          setSituacaoSistema([]); // Se os dados forem vazios, define o array como vazio
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
        </div>

        <div className="row">
          <div className="col-sm-11 col-lg-11 mb-11">
            <p className="h3">Cadastro de Siglas</p>
            <p>Informe os campos abaixo para realizar o cadastro.</p>
            <span className="br-divider my-3"></span>
          </div>
          <div className="col-sm-1 col-lg-1 mb-1">
            <OptionsMenu
              id={id}
              onNewClick={() => setId(0)}
              onDeleteClick={handleExcluir}
            />
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : (

        <form onSubmit={handleSubmit(onSubmit)}>
            
          <div className="row">
              <div className="col pt-1 pb-1">
                  <div className="col-sm-4 col-md-4 col-lg-2">
                    <div className="br-input">
                      <label htmlFor="siglasistema">Sigla:</label>
                      <input
                        id="siglasistema"
                        type="text"
                        placeholder=""
                        {...register('siglasistema', { required: 'Campo Obrigatório.' })}
                      />
                      <ErrorDisplayField errors={errors} name="siglasistema" className="feedback danger" />                    </div>
                  </div>

                  <div className="col-sm-12 col-md-10 col-lg-10">
                    <div className="br-textarea">
                      <label htmlFor="descricaosistema">Descrição detalhada:</label>
                      <textarea
                        id="descricaosistema"
                        rows={5}
                        placeholder="Digite aqui mais informações..."
                        {...register('descricaosistema', { required: 'Campo Obrigatório.' })}
                      ></textarea>
                      <ErrorDisplayField errors={errors} name="descricaosistema" className="feedback danger" />
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
                      name="idsistemapai" 
                      options={sistemaPai} 
                      label="Sistema Relacionado (Pai): (Opcional)" 
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-4">
                    <SelectGrid 
                        control={control} 
                        name="idtiposistema" 
                        options={tipoSistema} 
                        label="Tipo:" 
                        rules={{ required: 'Campo Obrigatório.' }}
                     />
                    <ErrorDisplayField errors={errors} name="idtiposistema" className="feedback danger" />                  
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
                      <label htmlFor="sistemacritico">Sistema Crítico:</label>
                      <input
                        id="sistemacritico"
                        type="checkbox"
                        {...register('sistemacritico')}
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
                      <label htmlFor="obssistema">Observações gerais: (Opcional)</label>
                      <textarea
                        id="obssistema"
                        rows={5}
                        placeholder="Digite aqui mais informações..."
                        {...register('obssistema')}
                      ></textarea>
                    </div>
                  </div>
                  <br/>
                  <br/>
                  <div className="col-sm-12 col-md-6 col-lg-4">
                    <SelectGrid 
                          control={control} 
                          name="idsituacaosistema" 
                          options={situacaoSistema} 
                          label="Situação:" 
                          rules={{ required: 'Campo Obrigatório.' }}
                     />
                     <ErrorDisplayField errors={errors} name="idsituacaosistema" className="feedback danger" />
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

        )}
      </div>
      <Outlet />
    </main>
  );
}
