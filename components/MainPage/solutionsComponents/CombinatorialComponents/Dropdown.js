import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import { listNum } from "../actions";
import { listChanged } from "../actions";
import { makeStyles } from "@material-ui/core/styles";
import { Squash as Hamburger } from "hamburger-react";

// import MinimalSelect from "./MinimalDropDown";

var menuOptions = [
  "Industry",
  "ID Zone",
  "Embodiment",
  "Blockchain",
  "NFT",
  "Primitives",
  "Companies",
];

// const useStyles = makeStyles({
//   root: {
//     width: 200,
//     "& .MuiOutlinedInput-input": {
//       color: "green",
//     },
//     "& .MuiInputLabel-root": {
//       color: "green",
//     },
//     "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
//       borderColor: "green",
//     },
//     "&:hover .MuiOutlinedInput-input": {
//       color: "red",
//     },
//     "&:hover .MuiInputLabel-root": {
//       color: "red",
//     },
//     "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
//       borderColor: "red",
//     },
//     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
//       color: "purple",
//     },
//     "& .MuiInputLabel-root.Mui-focused": {
//       color: "purple",
//     },
//     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: "purple",
//     },
//   },
// });

export default function Dropdown({
  sendDataToParent,
  initial,
  listNumber,
  open,
}) {
  //redux
  // const listRedux = useSelector((state) => state.list);
  // const listChangedRedux = useSelector((state) => state.listChanged);

  // const dispatch = useDispatch();
  // dispatch(listChanged(false));

  // const handleChange = (event) => {
  //   let changedValue = event.target.value;
  //   dispatch(listChanged(true));

  //   dispatch(listNum(changedValue));
  //   // sendDataToParent(changedValue);
  // };

  //Hamburger menu

  // const [isOpen, setOpen] = useState(false);

  // useEffect(() => {
  //   console.log("UE2");

  //   if (open === true) {
  //     setOpen(true);
  //   }
  // }, [open]);

  // let displayName;

  // if (initial === 0) {
  //   displayName = initial;
  // } else {
  // }

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
      {/* <Hamburger
        className="hamburger"
        toggled={isOpen}
        toggle={() => {
          setOpen(!isOpen);
        }}
        // size={25}
        easing="ease-in"
        label="Show menu"
        rounded
      /> */}

      {open ? menu : null}
    </div>
  );
}
