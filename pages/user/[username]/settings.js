import DarkModeToggle from "../../../components/DarkModeToggle";

const settings = () => {

  return (
    <div className="sentence-container fade-effect-quick">
      <h1 className="heading-top">Settings</h1>
      <p>Dark Mode: </p>
      <DarkModeToggle />

    </div>
  );
};

export default settings;
