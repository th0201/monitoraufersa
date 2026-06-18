import { useState, useEffect } from "react";

function App() {

  const [mensagem, setMensagem] = useState("");
  const [disciplinas, setDisciplinas] = useState([]);
  const [logado, setLogado] = useState(false);

  const [nome, setNome] = useState("");
  const [monitor, setMonitor] = useState("");

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
  // VERIFICAR LOGIN
  // =========================
  useEffect(() => {

    const hash = window.location.hash;

    if (hash.includes("id_token") || hash.includes("access_token")) {
      setLogado(true);
      window.history.replaceState(null, "", window.location.pathname);
    }

  }, []);

  // =========================
  // CARREGAR DISCIPLINAS
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
    if (logado) carregarDisciplinas();
  }, [logado]);

  // =========================
  // AGENDAR
  // =========================
  const agendar = (disciplina) => {
    setMensagem(
      `Monitoria de ${disciplina.nome} agendada com ${disciplina.monitor}`
    );
  };

  // =========================
  // EXCLUIR
  // =========================
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
  // ADICIONAR
  // =========================
  const adicionarDisciplina = async () => {

    if (!nome || !monitor) {
      setMensagem("Preencha todos os campos!");
      return;
    }

    try {

      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome,
          monitor
        })
      });

      setNome("");
      setMonitor("");
      setMensagem("Disciplina adicionada com sucesso!");
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
          flexDirection: "column",
          background: "linear-gradient(to bottom, #020617, #0f172a)",
          color: "white"
        }}
      >

        <h1
          style={{
            fontSize: "64px",
            fontWeight: "800",
            background: "linear-gradient(90deg, #34d399, #10b981)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0px 4px 20px rgba(16,185,129,0.4)",
            letterSpacing: "2px"
          }}
        >
          MonitoraUFERSA
        </h1>

        <p style={{ color: "#cbd5e1", marginBottom: "20px" }}>
          Sistema de monitorias da UFERSA
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
  // SISTEMA PRINCIPAL
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

        {/* HEADER */}
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "800",
            background: "linear-gradient(90deg, #34d399, #10b981)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0px 3px 15px rgba(16,185,129,0.35)"
          }}
        >
          MonitoraUFERSA
        </h1>

        {/* FORM ADICIONAR */}
        <div
          style={{
            backgroundColor: "#111827",
            padding: "20px",
            borderRadius: "15px",
            marginTop: "20px",
            marginBottom: "30px"
          }}
        >

          <h3 style={{ color: "#34d399" }}>Nova Disciplina</h3>

          <input
            placeholder="Nome da disciplina"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <input
            placeholder="Monitor"
            value={monitor}
            onChange={(e) => setMonitor(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <button
            onClick={adicionarDisciplina}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "8px",
              cursor: "pointer",
              width: "100%"
            }}
          >
            Adicionar Disciplina
          </button>

        </div>

        {/* MENSAGEM */}
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

        {/* LISTA */}
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