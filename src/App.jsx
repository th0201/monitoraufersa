import { useEffect, useState } from "react";

function App() {

  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {

    fetch("https://m80ggktfb6.execute-api.us-east-1.amazonaws.com/disciplinas")
      .then((response) => response.json())
      .then((data) => {
        setDisciplinas(data);
      });

  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">

        <h1 className="text-3xl font-bold text-emerald-400">
          MonitoraUFERSA
        </h1>

        <button className="bg-emerald-500 hover:bg-emerald-600 px-5 py-2 rounded-xl font-semibold">
          Login
        </button>

      </nav>

      {/* Hero */}
      <section className="text-center py-24 px-6">

        <h2 className="text-6xl font-bold leading-tight max-w-4xl mx-auto">
          Agende suas monitorias
          <span className="text-emerald-400"> facilmente</span>
        </h2>

        <p className="text-slate-400 text-xl mt-8 max-w-2xl mx-auto">
          Plataforma acadêmica para monitorias acadêmicas da UFERSA.
        </p>

      </section>

      {/* Cards */}
      <section className="grid md:grid-cols-3 gap-8 px-8 pb-20">

        {disciplinas.map((disciplina, index) => (

          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
          >

            <h3 className="text-2xl font-bold mb-3">
              {disciplina.nome}
            </h3>

            <p className="text-slate-400 mb-6">
              Monitor: {disciplina.monitor}
            </p>

            <button className="bg-emerald-500 hover:bg-emerald-600 px-5 py-3 rounded-xl">
              Agendar
            </button>

          </div>

        ))}

      </section>

    </div>
  );
}

export default App;