import MultiStepForm from "./components/MultiStepForm";
import { FormContextProvider } from "./context/FormContext";

function App() {
  return (
    <main>
      <FormContextProvider>
        <MultiStepForm />
      </FormContextProvider>
    </main>
  );
}

export default App;
