function SolutionsPage() {

  
  // const clickHandler1 = (event) => {
  //   navigate("/solutions/combinatorial");
  // };
  // const clickHandler2 = (event) => {
  //   navigate("/solutions/sentence");
  // };
  // const clickHandler3 = (event) => {
  //   navigate("/solutions/TBD");
  // };


  return (
    <div className="solution-page">
      <h1 className="heading-top">Solution Page</h1>
      <h4>Tools:</h4>

      <div
        className="solution-button"
        // onClick={clickHandler1}
      >
        Combinatorial Tool
      </div>
      <div
        className="solution-button"
        // onClick={clickHandler2}
      >
        Sentence Tool
      </div>
      <div
        className="solution-button"
        // onClick={clickHandler3}
      >
        TBD Tool
      </div>
    </div>
  );
}

export default SolutionsPage;
