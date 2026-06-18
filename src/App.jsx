import { useState, useEffect } from "react";

function App() {

  const [mensagem, setMensagem] = useState("");
  const [disciplinas, setDisciplinas] = useState([]);

  const API_URL =
    "https://m80ggktfb6.execute-api.us-east-1.amazonaws.com/prod/disciplinas";

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

  useEffect(() => {

    const carregarDisciplinas = async () => {

      try {

        const resposta = await fetch(API_URL);

        const dados = await resposta.json();

        setDisciplinas(dados);

      } catch (erro) {

        console.error("Erro ao carregar disciplinas:", erro);

      }

    };

    carregarDisciplinas();

  }, []);

  const agendar = (disciplina) => {

    setMensagem(
      `Monitoria de ${disciplina.nome} agendada com sucesso com ${disciplina.monitor}!`
    );

  };

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

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto"
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
            flexWrap: "wrap",
            gap: "20px"
          }}
        >

          <div>

            <h1
              style={{
                fontSize: "42px",
                color: "#34d399",
                marginBottom: "10px"
              }}
            >
              MonitoraUFERSA
            </h1>

            <p
              style={{
                color: "#cbd5e1",
                fontSize: "18px"
              }}
            >
              Sistema de agendamento de monitorias
            </p>

          </div>

          <button
            onClick={login}
            style={{
              backgroundColor: "#10b981",
              border: "none",
              padding: "14px 22px",
              borderRadius: "12px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Entrar com Cognito
          </button>

        </div>

        {mensagem && (

          <div
            style={{
              backgroundColor: "#064e3b",
              color: "#d1fae5",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "25px",
              fontWeight: "bold"
            }}
          >
            ✅ {mensagem}
          </div>

        )}

        <h2
          style={{
            marginBottom: "25px",
            fontSize: "28px"
          }}
        >
          Monitorias disponíveis
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px"
          }}
        >

          {disciplinas.map((disciplina) => (

            <div
              key={disciplina.id}
              style={{
                backgroundColor: "#111827",
                padding: "25px",
                borderRadius: "20px",
                border: "1px solid #1e293b"
              }}
            >

              <h3
                style={{
                  color: "#34d399",
                  marginBottom: "15px",
                  fontSize: "24px"
                }}
              >
                {disciplina.nome}
              </h3>

              <p
                style={{
                  marginBottom: "20px",
                  color: "#cbd5e1"
                }}
              >
                👨‍🏫 Monitor: {disciplina.monitor}
              </p>

              <button
                onClick={() => agendar(disciplina)}
                style={{
                  width: "100%",
                  backgroundColor: "#10b981",
                  border: "none",
                  padding: "12px",
                  borderRadius: "10px",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Agendar Monitoria
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default App;