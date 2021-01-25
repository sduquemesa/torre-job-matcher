import InputForm from "./InputForm.js";

export default function GetDesiredJob(props) {
  return (
    <div className="question">
      <h1>What do you want to become?</h1>
      <InputForm
        label="Skill/Opportunity"
        search_type={"opportunity"}
        parentCallback={props.parentCallback}
      />
    </div>
  );
}
