import InputForm from "./InputForm.js";
import Typography from "@material-ui/core/Typography";

export default function GetUsername(props) {
  return (
    <div className="question">
      <Typography
        variant="h2"
        color="textPrimary"
        component="p"
        style={{ whiteSpace: "pre-line", marginBottom: "10px" }}
      >
        Who are you?
      </Typography>
      <InputForm
        label="Torre User"
        search_type={"people"}
        parentCallback={props.parentCallback}
      />
    </div>
  );
}
