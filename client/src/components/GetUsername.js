import InputForm from "./InputForm.js";

export default function GetUsername(props) {
  return (
    <div className="question">
      <h1>Who are you?</h1>
      <InputForm
        label="Torre User"
        search_type={"people"}
        parentCallback={props.parentCallback}
      />
    </div>
  );
}