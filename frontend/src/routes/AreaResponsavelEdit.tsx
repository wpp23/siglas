import React, { useEffect, useState, useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, Outlet, Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import requestWithToken from '../services/apiService';
import { AuthContext } from '../contexts/AuthContext';
import { HTMLMainElement } from 'dom';
import OptionsMenu from '../components/OptionsMenu';
import ErrorDisplayField from '../components/ErrorDisplayField';

interface AreaResponsavelData {
  siglaarea: string;
  descrarea: string;
}

const rotaFront = '/arearesponsavel';
const rotaDefault = '/arearesponsavel';

export default function AreaResponsavelEdit() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors = {} },
  } = useForm<AreaResponsavelData>({
    defaultValues: {
      siglaarea: '',
      descrarea: '',
    },
  });

  const { auth, token } = useContext(AuthContext);
  const navigate = useNavigate();

  //Verifica se está autenticado
  if (!auth) {
    navigate('/login');
  }

  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams<{ id: string }>();
  const [id, setId] = useState(Number(params.id));
  const mainRef = useRef<HTMLMainElement>(null);

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
    setValue('siglaarea', '');
    setValue('descrarea', '');
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
            const { siglaarea, descrarea } = response.data[0];

            setValue('siglaarea', siglaarea);
            setValue('descrarea', descrarea);
          });
        } else {
          limparCampos();
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
  const onSubmit = async (data: AreaResponsavelData) => {
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
          setId(response.data[0].idarearesponsavel);
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

    setTimeout(() => {
      if (mainRef.current) {
        mainRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

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
                  <Link to={rotaFront}>Áreas Responsáveis</Link>
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
        </div>

        <div className="row">
          <div className="col-sm-11 col-lg-11 mb-11">
            <p className="h3">Cadastro de Áreas Responsáveis</p>
            <p>Informe os campos abaixo para realizar o cadastro.</p>
            <span className="br-divider my-3"></span>
          </div>
          <div className="col-sm-1 col-lg-1 mb-1">
            <OptionsMenu id={id} onNewClick={() => setId(0)} onDeleteClick={handleExcluir} />
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col pt-1 pb-1">
                <div className="col-sm-4 col-md-4 col-lg-3">
                  <div className="br-input">
                    <label htmlFor="siglaarea">Sigla:</label>
                    <input
                      id="siglaarea"
                      type="text"
                      placeholder=""
                      {...register('siglaarea', { required: 'Campo Obrigatório.' })}
                    />
                    <ErrorDisplayField
                      errors={errors}
                      name="siglaarea"
                      className="feedback danger"
                    />
                  </div>
                </div>

                <div className="col-sm-12 col-md-10 col-lg-9">
                  <div className="br-textarea">
                    <label htmlFor="descrarea">Descrição:</label>
                    <textarea
                      id="descrarea"
                      rows={5}
                      placeholder="Digite aqui mais informações..."
                      {...register('descrarea', { required: 'Campo Obrigatório.' })}
                    ></textarea>
                    <ErrorDisplayField
                      errors={errors}
                      name="descrarea"
                      className="feedback danger"
                    />
                    <div className="text-base mt-1">
                      <span className="limit" aria-live="polite">
                        Limite máximo de <strong>1000</strong> caracteres
                      </span>
                      <span className="current" aria-live="polite" role="status" id="limitmax"></span>
                    </div>
                  </div>
                </div>

                <span className="br-divider my-3"></span>
                <div className="d-flex mt-1 flex-row justify-content-center">
                  <Link to="/arearesponsavel" className="br-button mt-3 mt-sm-0 ml-sm-3">
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
