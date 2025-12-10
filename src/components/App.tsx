import automergeLogo from "/automerge.png";
import "@picocss/pico/css/pico.min.css";
import { type AutomergeUrl } from "@automerge/react";
import { TaskList } from "./TaskList";

function App({ docUrl }: { docUrl: AutomergeUrl }) {
  return (
    <>
      <header>
        <h1>
          <img src={automergeLogo} alt="Automerge logo" id="automerge-logo" />
          Automerge Task List
        </h1>
      </header>

      <main>
        <div className="task-list">
          {docUrl ? <TaskList docUrl={docUrl} /> : null}
        </div>
      </main>
    </>
  );
}

export default App;
