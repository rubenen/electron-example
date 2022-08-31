import {
  html,
  render,
  useState,
  useEffect,
} from "https://unpkg.com/htm/preact/standalone.mjs";

function App(props) {
  return html`<div>
    <h1>Hello ${props.name}!</h1>
    <${Counter} />
    <${Docker} />
  </div>`;
}

function Counter() {
  const [count, setCount] = useState(0);

  return html`
    <div>
      <h1>${count}</h1>
      <button onClick=${() => setCount(count + 1)}>Count</button>
    </div>
  `;
}

function Docker() {
  const [dockerOutput, setDockerOutput] = useState("");

  useEffect(() => {
    window.electronAPI.onDockerPS((event, value) => {
      setDockerOutput(value.dockerps);
    });
  }, []);

  return html`<div>
    <button onClick=${() => window.electronAPI.dockerPS()}>Docker PS</button>
    <pre>${dockerOutput}</pre>
  </div>`;
}

render(html`<${App} name="World" />`, document.querySelector("#root"));
