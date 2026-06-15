function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">

        <h1 className="text-3xl font-bold text-emerald-400">
          MonitoraUFERSA
        </h1>

        <button className="bg-emerald-500 hover:bg-emerald-600 px-5 py-2 rounded-xl font-semibold">
          Login
        </button>

      </nav>

      <section className="text-center py-24 px-6">

        <h2 className="text-6xl font-bold leading-tight max-w-4xl mx-auto">
          Agende suas monitorias
          <span className="text-emerald-400"> facilmente</span>
        </h2>

        <p className="text-slate-400 text-xl mt-8 max-w-2xl mx-auto">
          Plataforma acadêmica para monitorias acadêmicas da UFERSA.
        </p>

        <button className="mt-10 bg-emerald-500 hover:bg-emerald-600 px-8 py-4 rounded-2xl text-lg font-semibold">
          Agendar agora
        </button>

      </section>

      <section className="grid md:grid-cols-3 gap-8 px-8 pb-20">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <h3 className="text-2xl font-bold mb-3">
            Sistemas Distribuídos
          </h3>

          <p className="text-slate-400 mb-6">
            Monitor: Carlos Silva
          </p>

          <button className="bg-emerald-500 hover:bg-emerald-600 px-5 py-3 rounded-xl">
            Agendar
          </button>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <h3 className="text-2xl font-bold mb-3">
            Banco de Dados
          </h3>

          <p className="text-slate-400 mb-6">
            Monitor: Ana Costa
          </p>

          <button className="bg-emerald-500 hover:bg-emerald-600 px-5 py-3 rounded-xl">
            Agendar
          </button>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <h3 className="text-2xl font-bold mb-3">
            Algoritmos
          </h3>

          <p className="text-slate-400 mb-6">
            Monitor: João Lima
          </p>

          <button className="bg-emerald-500 hover:bg-emerald-600 px-5 py-3 rounded-xl">
            Agendar
          </button>

        </div>

      </section>

    </div>
  )
}

export default App