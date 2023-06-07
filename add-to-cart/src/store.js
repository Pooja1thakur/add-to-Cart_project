import {createStore} from "redux";
import rootred  from "./redux/reducers/main";
import { create } from "@mui/material/styles/createTransitions";





const store=createStore (
    rootred
);


export default store