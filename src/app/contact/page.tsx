"use client";

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-bg text-text px-10 py-20 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

        <div>
          <h1 className="text-5xl font-bold mb-10 text-text">Contato</h1>
          <p className="mb-6">
            Carol Silva é representada por <br /> Criativos Unidos
          </p>

          <p className="mb-2">Email: thaysbeiracontacts@gmail.com</p>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="flex flex-col">
            <label htmlFor="nome" className="mb-2 text-text">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              className="bg-transparent border-b border-neutral focus:border-primary focus:outline-none py-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="sobrenome" className="mb-2 text-text">
              Sobrenome
            </label>
            <input
              id="sobrenome"
              type="text"
              className="bg-transparent border-b border-neutral focus:border-primary focus:outline-none py-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-text">
              Email *
            </label>
            <input
              id="email"
              type="email"
              required
              className="bg-transparent border-b border-neutral focus:border-primary focus:outline-none py-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="telefone" className="mb-2 text-text">
              Telefone
            </label>
            <input
              id="telefone"
              type="tel"
              className="bg-transparent border-b border-neutral focus:border-primary focus:outline-none py-2"
            />
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label htmlFor="mensagem" className="mb-2 text-text">
              Insira sua mensagem aqui
            </label>
            <textarea
              id="mensagem"
              rows={4}
              className="bg-transparent border-b border-neutral focus:border-primary focus:outline-none py-2 resize-none"
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-8 py-2 border border-primary text-primary hover:bg-primary hover:text-bg transition rounded"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
