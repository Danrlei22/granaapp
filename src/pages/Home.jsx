function Home() {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center">
      <div className="flex flex-col justify-between items-center mb-4 border-4 border-black p-2 rounded m-4">
        <h2>Mês</h2>

        <div>
          <p>Saldo atual:</p>
          <p>R$ + 5.000,00</p>
        </div>

        <div>
          <p>Entrada:</p>
          <p>R$ + 4.000,00</p>
        </div>

        <div>
          <p>Saída:</p>
          <p>R$ - 1.000,00</p>
        </div>
      </div>

      <div className="flex justify-center items-center border-4 border-black p-2 rounded m-4">
        <p>Economizar hoje é investir no seu amanhã.</p>
        {/* Fazer um array de frases motivacionais e exibir uma aleatória */}
      </div>

      <div className="flex flex-col justify-between items-center mb-4 border-4 border-black p-2 rounded m-4">
        <div>
          <h2>ultimas transferencias</h2>

          <div className="flex flex-col justify-between items-center">
            <div>
                <p>+ 1000,00</p>
                <p>Transferência</p>
                <p>10/10/2023</p>
            </div>
            <div>
                <p>+ 10000,00</p>
                <p>Transferência</p>
                <p>10/10/2023</p>
            </div>
            <div>
                <p>- 1000,00</p>
                <p>Transferência</p>
                <p>10/10/2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
