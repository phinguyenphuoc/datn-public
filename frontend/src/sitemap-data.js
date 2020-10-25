import axios from "axios";
import { API_URL } from "./config";

var ids = [];
var idMap = [];

const getTeacherData = () => {
    axios
        .get(`${API_URL}/teachers/profiles`)
        .then((response) => {
            ids = response.data.teachers;
            ids.map((item) => (
                idMap.push({ teacherTag: `${item.tag}` })
            ));
            return idMap;
        }), (error) => {
            console.log(error);
        };
}

getTeacherData();

export default idMap;
