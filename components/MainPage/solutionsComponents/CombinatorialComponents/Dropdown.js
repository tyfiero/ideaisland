import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

var menuOptions = [
  "Industry",
  "ID Zone",
  "Embodiment",
  "Blockchain",
  "NFT",
  "Primitives",
  "Companies",
];

export default function Dropdown({
  sendDataToParent,
  initial,
  listNumber,
  open,
}) {
 
  let menu = (
    <FormControl
      sx={{
        m: 1,
        minWidth: 80,
        bgcolor: "#ffffff6c",
        boxShadow:
          "inset 14px 14px 28px #989898 inset -14px -14px 28px #ffffff;",
        margin: "0px",
        // height: "20px",
        // borderRadius: "50px",
        // border: ,
        zIndex: 5,
      }}
    >
      <Select
        id="select-autowidth"
        value={listNumber}
        onChange={(event) => {
          let changedValue = event.target.value;
          let listChangedFromDD = true;
          sendDataToParent([changedValue, listChangedFromDD]);
        }}
        autoWidth
      >
        <MenuItem value={0}>{menuOptions[0]}</MenuItem>
        <MenuItem value={1}>{menuOptions[1]}</MenuItem>
        <MenuItem value={2}>{menuOptions[2]}</MenuItem>
        <MenuItem value={3}>{menuOptions[3]}</MenuItem>
        <MenuItem value={4}>{menuOptions[4]}</MenuItem>
        <MenuItem value={5}>{menuOptions[5]}</MenuItem>
        <MenuItem value={6}>{menuOptions[6]}</MenuItem>
      </Select>
    </FormControl>
  );
  return (
    <div>


      {open ? menu : null}
    </div>
  );
}
