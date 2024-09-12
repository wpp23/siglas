import axios from "axios";

// Configura o Axios
axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8'
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'

export const apiService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_BACKEND,
  responseType: "json",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
});

const requestWithToken = async (config: any, token: string | null) => {
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    return await apiService(config); 
  } catch (error: any) {
    if (error.response && (error.response.status === 400 || error.response.status === 401)) {
      throw "O tempo de atividade encerrou, necessário fazer login novamente.";
    } else {
      throw error;
    }
  }
};


export default requestWithToken;

