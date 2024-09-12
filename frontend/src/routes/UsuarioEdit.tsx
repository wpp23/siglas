import React, { useEffect, useState, useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, Outlet, Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import requestWithToken from '../services/apiService';
import { AuthContext } from '../contexts/AuthContext';
import { HTMLMainElement } from 'dom';
import OptionsMenu from '../components/OptionsMenu';
import ErrorDisplayField from '../components/ErrorDisplayField';
import { formatDate } from '../components/DateUtils';

interface UsuarioData {
  login: string;
  indbloqueado: boolean;
  pwd?: string; // Senha pode ser opcional na edição
  datacriacao: Date | null;
}

const rotaFront = '/usuario';
const rotaDefault = '/usuario'; // Define a rota padrão do backend

export default function UsuarioEdit() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors = {} },
  } = useForm<UsuarioData>({
    defaultValues: {
      login: '',
      indbloqueado: false,
      pwd: '',
      datacriacao: formatDate(new Date()), 
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
    setValue('login', '');
    setValue('indbloqueado', false);
    setValue('pwd', '');
    setValue('datacriacao', formatDate(new Date()));
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
            const { login, indbloqueado, datacriacao } = response.data[0];

            setValue('login', login);
            setValue('indbloqueado', indbloqueado);
            setValue('datacriacao', formatDate(datacriacao));
            console.log(response.data[0]);
            console.log("data:",datacriacao);
            console.log("formatada:",formatDate(datacriacao));
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
  const onSubmit = async (data: UsuarioData) => {
    try {
      if (id === 0) {
        // Na criação, inclua a senha no corpo da requisição
        const response = await requestWithToken(
          {
            method: 'POST',
            url: rotaDefault,
            data: data,
          },
          token
        ).then((response) => {
          setId(response.data[0].id);
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
                  <Link to={rotaFront}>Usuários</Link>
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
            <p className="h3">Cadastro de Usuários</p>
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
                    <label htmlFor="login">Login:</label>
                    <input
                      id="login"
                      type="text"
                      placeholder=""
                      {...register('login', { required: 'Campo Obrigatório.' })}
                    />
                    <ErrorDisplayField
                      errors={errors}
                      name="login"
                      className="feedback danger"
                    />
                  </div>
                </div>

                <div className="col-sm-4 col-md-4 col-lg-3">
                  <div className="br-input">
                    <label htmlFor="pwd">Senha: (Desconsiderar)</label>
                    <input
                      id="pwd"
                      type="password"
                      placeholder=""
                      {...register('pwd')} // Senha não é obrigatória na edição
                    />
                    <ErrorDisplayField errors={errors} name="pwd" className="feedback danger" />
                  </div>
                </div>

                <div className="col-sm-4 col-md-4 col-lg-3">
                  <div className="br-input">
                    <label htmlFor="datacriacao">Data de Criação: (Automática)</label>
                    <input
                      id="datacriacao"
                      type="date"
                      placeholder=""
                      disabled={true}
                      {...register('datacriacao', { required: 'Campo Obrigatório.' })}
                    />
                    <ErrorDisplayField
                      errors={errors}
                      name="datacriacao"
                      className="feedback danger"
                    />
                  </div>
                </div>
                <br/>
                <div className="col-sm-12 col-lg-3 mb-2">
                  <div className="br-checkbox">
                    <input id="indbloqueado" type="checkbox" {...register('indbloqueado')} />
                    <label htmlFor="indbloqueado">Usuário Bloqueado</label>
                  </div>
                </div>

                <span className="br-divider my-3"></span>
                <div className="d-flex mt-1 flex-row justify-content-center">
                  <Link to="/usuario" className="br-button mt-3 mt-sm-0 ml-sm-3">
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

