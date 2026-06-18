import { useState, useEffect } from "react";

function App() {

  const [mensagem, setMensagem] = useState("");
  const [disciplinas, setDisciplinas] = useState([]);
  const [logado, setLogado] = useState(false);

  const API_URL =
    "https://m80ggktfb6.execute-api.us-east-1.amazonaws.com/prod/disciplinas";

  // =========================
  // LOGIN COGNITO
  // =========================
  const login = () => {

    const clientId = "1qh0531bvr9ckua0l8tmg0jro9";

    const redirectUri =
      "https://www.thayna-jacome.grupo5.sd.ufersa.dev.br";

    const cognitoDomain =
      "https://us-east-12suyavxth.auth.us-east-1.amazoncognito.com";

    window.location.href =
      `${cognitoDomain}/login?client_id=${clientId}` +
      `&response_type=token` +
      `&scope=email+openid` +
      `&redirect_uri=${redirectUri}`;
  };

  // =========================
  // CHECAR LOGIN (TOKEN)
  // =========================
  useEffect(() => {

    const hash = window.location.hash;

    if (hash.includes("id_token") || hash.includes("access_token")) {
      setLogado(true);

      // limpa URL bonita depois do login
      window.history.replaceState(null, "", window.location.pathname);
    }

  }, []);

  // =========================
  // CARREGAR DADOS
  // =========================
  const carregarDisciplinas = async () => {

    try {

      const resposta = await fetch(API_URL);
      const dados = await resposta.json();

      setDisciplinas(dados);

    } catch (erro) {
      console.error(erro);
    }

  };

  useEffect(() => {
    if (logado) {
      carregarDisciplinas();
    }
  }, [logado]);

  // =========================
  // AÇÕES
  // =========================
  const agendar = (disciplina) => {
    setMensagem(
      `Monitoria de ${disciplina.nome} agendada com sucesso com ${disciplina.monitor}!`
    );
  };

  const excluirDisciplina = async (id) => {

    try {

      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      setMensagem("Disciplina removida com sucesso!");
      carregarDisciplinas();

    } catch (erro) {
      console.error(erro);
    }
  };

  // =========================
  // TELA DE LOGIN
  // =========================
  if (!logado) {

    return (

      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to bottom, #020617, #0f172a)",
          color: "white",
          flexDirection: "column"
        }}
      >

        <h1 style={{ fontSize: "42px", color: "#34d399" }}>
          MonitoraUFERSA
        </h1>

        <p style={{ marginBottom: "20px", color: "#cbd5e1" }}>
          Faça login para acessar o sistema
        </p>

        <button
          onClick={login}
          style={{
            backgroundColor: "#10b981",
            border: "none",
            padding: "14px 22px",
            borderRadius: "12px",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Entrar com Cognito
        </button>

      </div>
    );
  }

  // =========================
  // SISTEMA (APÓS LOGIN)
  // =========================
  return (

    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #020617, #0f172a)",
        color: "white",
        fontFamily: "Arial",
        padding: "30px"
      }}
    >

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <div style={{ marginBottom: "30px" }}>
          <h1 style={{ color: "#34d399" }}>MonitoraUFERSA</h1>
          <p>Sistema de agendamento de monitorias</p>
        </div>

        {mensagem && (
          <div
            style={{
              backgroundColor: "#064e3b",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "20px"
            }}
          >
            {mensagem}
          </div>
        )}

        <h2>Monitorias disponíveis</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px"
          }}
        >

          {disciplinas.map((d) => (

            <div
              key={d.id}
              style={{
                backgroundColor: "#111827",
                padding: "20px",
                borderRadius: "12px"
              }}
            >

              <h3 style={{ color: "#34d399" }}>{d.nome}</h3>
              <p>Monitor: {d.monitor}</p>

              <button
                onClick={() => agendar(d)}
                style={{
                  width: "100%",
                  marginTop: "10px",
                  backgroundColor: "#10b981",
                  border: "none",
                  padding: "10px",
                  color: "white",
                  borderRadius: "8px"
                }}
              >
                Agendar
              </button>

              <button
                onClick={() => excluirDisciplina(d.id)}
                style={{
                  width: "100%",
                  marginTop: "10px",
                  backgroundColor: "#dc2626",
                  border: "none",
                  padding: "10px",
                  color: "white",
                  borderRadius: "8px"
                }}
              >
                Excluir
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default App;