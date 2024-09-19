import React, { useEffect, useState, useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, Outlet, Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import requestWithToken from '../services/apiService';
import { AuthContext } from '../contexts/AuthContext';
import { HTMLMainElement } from 'dom';
import OptionsMenu from '../components/OptionsMenu';
import SelectGrid from '../components/SelectGrid';
import ErrorDisplayField from '../components/ErrorDisplayField';

interface TecnologiaSiglaData {
  idsigla: number | null;
  idversaotecnologia: number | null;
  idambientesigla: number | null;
}

const rotaFront = '/tecnologiasigla';
const rotaDefault = '/tecnologiasigla'; // Define a rota padrão do backend

export default function TecnologiaSiglaEdit() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors = {} },
  } = useForm<TecnologiaSiglaData>({
    defaultValues: {
      idsigla: null,
      idversaotecnologia: null,
      idambientesigla: null,
    },
  });

  const { auth, token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Verifica se está autenticado
  if (!auth) {
    navigate('/login');
  }

  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams<{ id: string }>();
  const [id, setId] = useState(Number(params.id));

  // Create a ref to access the main element
  const mainRef = useRef<HTMLMainElement>(null);

  // Caixas de Seleção
  const [sigla, setSigla] = useState([]);
  const [versaoTecnologia, setVersaoTecnologia] = useState([]);
  const [ambienteSigla, setAmbienteSigla] = useState([]);

  // Função do delete
  async function handleExcluir(id: number) {
    if (confirm('Você tem certeza que deseja excluir este registro?')) {
      try {
        await requestWithToken(
          {
            method: 'DELETE',
            url: `${rotaDefault}/${id}`,
          },
          token
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
    setValue('idsigla', null);
    setValue('idversaotecnologia', null);
    setValue('idambientesigla', null);
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
            },
            token
          ).then((response) => {
            const { idsigla, idversaotecnologia, idambientesigla } = response.data[0];

            setValue('idsigla', idsigla);
            setValue('idversaotecnologia', idversaotecnologia);
            setValue('idambientesigla', idambientesigla);
          });
        } else {
          limparCampos();
        }

        // Carrega as caixas de seleção

        // Fetch sigla options
        const siglaResponse = await requestWithToken(
          {
            method: 'GET',
            url: 'sigla',
          },
          token
        );
        if (siglaResponse.data.length > 0) {
          setSigla(
            siglaResponse.data.map((item) => ({
              value: item.idsigla,
              label: item.sigla,
            }))
          );
        } else {
          setSigla([]); // Se os dados forem vazios, define o array como vazio
        }

        // Fetch versaoTecnologia options
        const versaoTecnologiaResponse = await requestWithToken(
          {
            method: 'GET',
            url: 'versaotecnologia',
          },
          token
        );
        if (versaoTecnologiaResponse.data.length > 0) {
          setVersaoTecnologia(
            versaoTecnologiaResponse.data.map((item) => ({
              value: item.idversaotecnologia,
              label: item.descrversaotecnologia,
            }))
          );
        } else {
          setVersaoTecnologia([]); // Se os dados forem vazios, define o array como vazio
        }

        // Fetch ambienteSigla options
        const ambienteSiglaResponse = await requestWithToken(
          {
            method: 'GET',
            url: 'ambientesigla',
          },
          token
        );
        if (ambienteSiglaResponse.data.length > 0) {
          setAmbienteSigla(
            ambienteSiglaResponse.data.map((item) => ({
              value: item.idambientesigla,
              label: item.descrambientesigla,
            }))
          );
        } else {
          setAmbienteSigla([]); // Se os dados forem vazios, define o array como vazio
        }
      } catch (error) {
        setMsg(`Não foi possível recuperar os dados. ID: ${id} - ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, setValue, token]);

  // Função de Submit do Form
  const onSubmit = async (data: TecnologiaSiglaData) => {
    try {
      if (id === 0) {
        const response = await requestWithToken(
          {
            method: 'POST',
            url: rotaDefault,
            data: data,
          },
          token
        ).then((response) => {
          setId(response.data[0].idtecnologiasigla);
          setSuccess(true);
          setMsg('Os dados foram salvos.');
        });
      } else {
        await requestWithToken(
          {
            method: 'PUT',
            url: `${rotaDefault}/${id}`,
            data: data,
          },
          token
        );
        setSuccess(true);
        setMsg('Os dados foram atualizados.');
      }

      navigate(rotaFront);
    } catch (error) {
      setSuccess(false);
      setMsg(
        `Não foi possível ${id === 0 ? 'salvar' : 'atualizar'
        } os dados. ID: ${id} - ${error}`
      );
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
      <br-message
        state="danger"
        closable
        title="Atenção."
        show-icon="true"
        message={'Parâmetro Inválido  ID: ' + id + id}
      ></br-message>
    );
  }

  return (
    <main className="d-flex flex-fill" id="main" ref={mainRef}>
      <div className="container-fluid">
        <div className="row">
          <div className="col mb-5 pt-1 pb-1">
            {success && msg !== null && (
              <br-message
                state="success"
                title="Sucesso."
                show-icon="true"
                message={msg}
              ></br-message>
            )}
            {!success && msg !== null && (
              <br-message
                state="danger"
                title="Atenção."
                show-icon="true"
                message={msg}
              ></br-message>
            )}

            <nav className="br-breadcrumb" aria-label="Breadcrumbs">
              <ol className="crumb-list" role="list">
                <li className="crumb home">
                  <Link to="/" className="br-button circle">
                    <span className="sr-only">Página inicial</span>
                    <i className="fas fa-home"></i>
                  </Link>
                </li>
                <li className="crumb">
                  <i className="icon fas fa-chevron-right"></i>
                  <Link to={rotaFront}>Tecnologias das Siglas</Link>
                </li>
                <li className="crumb" data-active="active">
                  <i className="icon fas fa-chevron-right"></i>
                  <span tabIndex={0} aria-current="page">
                    Cadastro
                  </span>
                </li>
              </ol>
            </nav>
          </div>
          <div className="row">
            <div className="col-sm-11 col-lg-11 mb-11">&nbsp;</div>
            <div className="col-sm-1 col-lg-1 mb-1">
              <OptionsMenu id={id} onNewClick={() => setId(0)} onDeleteClick={handleExcluir} />
            </div>
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col pt-1 pb-1">
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <SelectGrid
                    control={control}
                    name="idsigla"
                    options={sigla}
                    label="Sigla:"
                    rules={{ required: 'Campo Obrigatório.' }}
                  />
                  <ErrorDisplayField errors={errors} name="idsigla" className="feedback danger" />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <SelectGrid
                    control={control}
                    name="idversaotecnologia"
                    options={versaoTecnologia}
                    label="Versão da Tecnologia:"
                    rules={{ required: 'Campo Obrigatório.' }}
                  />
                  <ErrorDisplayField
                    errors={errors}
                    name="idversaotecnologia"
                    className="feedback danger"
                  />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <SelectGrid
                    control={control}
                    name="idambientesigla"
                    options={ambienteSigla}
                    label="Ambiente:"
                    rules={{ required: 'Campo Obrigatório.' }}
                  />
                  <ErrorDisplayField
                    errors={errors}
                    name="idambientesigla"
                    className="feedback danger"
                  />
                </div>

                <span className="br-divider my-3"></span>
                <div className="d-flex mt-1 flex-row justify-content-center">
                  <Link to="/siglaTecnologia" className="br-button mt-3 mt-sm-0 ml-sm-3">
                    Cancelar
                  </Link>
                  <input type="submit" className="br-button primary mt-3 mt-sm-0 ml-sm-3" />
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

