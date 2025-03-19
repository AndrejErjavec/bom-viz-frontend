import "./App.css";
import { DataView } from "./pages/DataView";

import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <DataView />;
    </MantineProvider>
  );
}

export default App;
