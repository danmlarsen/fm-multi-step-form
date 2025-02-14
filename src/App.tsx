import MultiStepForm from "./components/MultiStepForm";
import { FormContextProvider } from "./context/FormContext";

function App() {
  return (
    <main className="font-display bg-magnolia text-marine-blue min-h-screen">
      <FormContextProvider>
        <MultiStepForm />
      </FormContextProvider>
    </main>
  );
}

export default App;
