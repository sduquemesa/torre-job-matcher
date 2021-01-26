import InputForm from "./InputForm.js";
import Typography from "@material-ui/core/Typography";

export default function GetDesiredJob(props) {
  return (
    <div className="question">
      <Typography
        variant="h2"
        color="textPrimary"
        component="p"
        style={{ whiteSpace: "pre-line", marginBottom: "10px" }}
      >
        What do you want to do?
      </Typography>
      <InputForm
        label="Skill/Opportunity"
        search_type={"opportunity"}
        parentCallback={props.parentCallback}
      />
    </div>
  );
}
