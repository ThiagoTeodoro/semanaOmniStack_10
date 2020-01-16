import React, { useEffect, useState } from 'react';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import configAxios from './config/ConfigAxios';
import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

// Component : Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
// Estado : informações mantidada pelo componente. (Lembrar do conceito de Imutabilidade)
// Propriedade : Informações que um componente PAI passa para componente filho.


function App() {

  const [devs, setDevs] = useState([]);
  const [recarregarDevs, setRecarregarDevs] = useState(false);


  // Usamos o useEffects para gerenciar e garantir que as chamadas ocorram somente quando quisermos.
  // O array no final indica quando vai ser executado, o array vazio significa que será executado 
  // uma unica vez.

  useEffect(() => {

    console.log('Obtendo todos os Devs...')

    async function loadDevs() {
      const response = await configAxios.get('/devs');
      
      setDevs(response.data);
    }

    // Como  fizemos uma subfunção acima precisamos chamar aki
    loadDevs();

    /*
      Vamos voltar o estado para false por que toda hora tem que
      ficar mudando isso e eu só mudo para true então eu tenho 
      que assegurar que isso aqui vai ta sempre false depois 
      que execcutar. 

      Essa chamada que o useEffects fica escutando na realidade não
      checa true ou false, ela executa quando tem alteração do que 
      foi passado para ser monitorando o True ou False é um 
      jeito de usar isso a nosso favor.
    */
    setRecarregarDevs(false);
  },[recarregarDevs])


  /**
   * Método para realziar a inserção de um novo Dev na API
   * @param {*} e 
   */
  async function handleAddDev(data) {

    const response = await configAxios.post('/devs', data);

    // Recarregando Devs
    setRecarregarDevs(true);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => {
              return(
                <DevItem dev={dev}  key={dev._id}/>
              );
          })}          
        </ul>
      </main>
    </div>
  );
}

export default App;
