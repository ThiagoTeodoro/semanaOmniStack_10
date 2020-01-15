import React from 'react';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

// Component : Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
// Estado : informações mantidada pelo componente. (Lembrar do conceito de Imutabilidade)
// Propriedade : Informações que um componente PAI passa para componente filho.

function App() {
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input name="github_username" id="github_username" required />
          </div>
          
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required />
          </div>

          <div className="input-group">
          
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input name="latitude" id="latitude" required />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input name="longitude" id="longitude" required />
            </div>

          </div>

          <button type="submit">Salvar</button>
          
        </form>
      </aside>
      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img src="https://avatars1.githubusercontent.com/u/14279279?s=460&v=4" alt="Thiago Teodoro"></img>
              <div className="user-info">
                <strong>Thiago Teodoro</strong>
                <span>Java, Python, ReactJS, React Native, Node.js</span>
              </div>
            </header>
            <p>Desenvolvedor Web</p>
            <a  href="https://github.com/ThiagoTeodoro">Acessar perfil no GitHub</a>
          </li>
          <li className="dev-item">
            <header>
              <img src="https://avatars1.githubusercontent.com/u/14279279?s=460&v=4" alt="Thiago Teodoro"></img>
              <div className="user-info">
                <strong>Thiago Teodoro</strong>
                <span>Java, Python, ReactJS, React Native, Node.js</span>
              </div>
            </header>
            <p>Desenvolvedor Web</p>
            <a  href="https://github.com/ThiagoTeodoro">Acessar perfil no GitHub</a>
          </li>
          <li className="dev-item">
            <header>
              <img src="https://avatars1.githubusercontent.com/u/14279279?s=460&v=4" alt="Thiago Teodoro"></img>
              <div className="user-info">
                <strong>Thiago Teodoro</strong>
                <span>Java, Python, ReactJS, React Native, Node.js</span>
              </div>
            </header>
            <p>Desenvolvedor Web</p>
            <a  href="https://github.com/ThiagoTeodoro">Acessar perfil no GitHub</a>
          </li>
          <li className="dev-item">
            <header>
              <img src="https://avatars1.githubusercontent.com/u/14279279?s=460&v=4" alt="Thiago Teodoro"></img>
              <div className="user-info">
                <strong>Thiago Teodoro</strong>
                <span>Java, Python, ReactJS, React Native, Node.js</span>
              </div>
            </header>
            <p>Desenvolvedor Web</p>
            <a  href="https://github.com/ThiagoTeodoro">Acessar perfil no GitHub</a>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
