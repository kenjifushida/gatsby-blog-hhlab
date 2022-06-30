import * as React from "react"
import * as styles from "../styles/combobox.module.scss"
import Search from "../assets/search.svg"

import TagsInput from "./tagsinput.js"

const selectedTags = tags => {
    console.log(tags);
};

//        <Search/> <input className={styles.combobox} type="text" maxlength="25" placeholder="Tag search">

const Combobox = ({}) => (
    <div>
        <TagsInput style="display:flex, list-style:none, " selectedTags={selectedTags}  tags={[]}/>
    </div>
)

export default Combobox