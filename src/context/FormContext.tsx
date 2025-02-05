import { createContext, useContext, useReducer } from "react";

type TPersonalInfo = {
  name: string;
  email: string;
  phone: string;
};

type TSelectedAddons = {
  onlineService: boolean;
  largerStorage: boolean;
  customProfile: boolean;
};

type TFormData = TPersonalInfo &
  TSelectedAddons & {
    isYearly: boolean;
    selectedPlan: number;
  };

type TFormState = {
  currentStep: number;
  formData: TFormData;
};

type TFormContext = TFormState & {
  handleSetStep: (step: number) => void;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handleUpdatePersonalInfo: (payload: TPersonalInfo) => void;
  handleUpdatePickAddons: (payload: TSelectedAddons) => void;
};

type TActions =
  | { type: "SET_STEP"; payload: number }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "UPDATE_PERSONAL_INFO"; payload: TPersonalInfo }
  | { type: "UPDATE_PLANS"; payload: number }
  | { type: "UPDATE_ADDONS"; payload: TSelectedAddons };

const FormContext = createContext<TFormContext | null>(null);

const initialFormState = {
  currentStep: 0,
  formData: {
    name: "",
    email: "",
    phone: "",
    isYearly: false,
    selectedPlan: 0,
    onlineService: true,
    largerStorage: true,
    customProfile: false,
  },
};

function reducer(state: TFormState, action: TActions) {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "NEXT_STEP":
      return { ...state, currentStep: state.currentStep + 1 };
    case "PREV_STEP":
      return { ...state, currentStep: state.currentStep - 1 };
    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };
    case "UPDATE_PLANS":
      return {
        ...state,
        formData: { ...state.formData, selectedPlan: action.payload },
      };
    case "UPDATE_ADDONS":
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };
    default:
      return state;
  }
}

export function useMultiStepForm() {
  const context = useContext(FormContext);
  if (!context) throw new Error("Error using form context.");
  return context;
}

export function FormContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialFormState);

  function handleSetStep(payload: number) {
    dispatch({ type: "SET_STEP", payload });
  }

  function handleNextStep() {
    dispatch({ type: "NEXT_STEP" });
  }

  function handlePrevStep() {
    dispatch({ type: "PREV_STEP" });
  }

  function handleUpdatePersonalInfo(payload: TPersonalInfo) {
    dispatch({ type: "UPDATE_PERSONAL_INFO", payload });
  }

  function handleUpdatePickAddons(payload: TSelectedAddons) {
    dispatch({ type: "UPDATE_ADDONS", payload });
  }

  return (
    <FormContext.Provider
      value={{
        ...state,
        handleSetStep,
        handleNextStep,
        handlePrevStep,
        handleUpdatePersonalInfo,
        handleUpdatePickAddons,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
