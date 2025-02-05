import MultiStepForm from "./components/MultiStepForm";
import { FormContextProvider } from "./context/FormContext";

function App() {
  return (
    <div className="font-display bg-magnolia min-h-screen">
      <FormContextProvider>
        <MultiStepForm />
      </FormContextProvider>
    </div>
  );
}

export default App;
