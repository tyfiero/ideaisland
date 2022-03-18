import DarkModeToggle from "../components/Layout/DarkModeToggle";
import AuthCheck from "../components/Authentication/AuthCheck";

const settings = () => {

  return (
    <AuthCheck>
    <div className="sentence-container fade-effect-quick">
      <h1 className="heading-top">Settings</h1>
      <p>Dark Mode: </p>
      <DarkModeToggle />

    </div>
    </AuthCheck>
  );
};

export default settings;
