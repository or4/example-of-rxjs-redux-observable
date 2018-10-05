import * as React from "react";
const styles = require('./styles.scss');
import { SearchSuggestions } from ':components/SearchSuggestions';
import TextToSave from ':components/TextToSave';
import Profile from ':components/Profile';


export const TemplateScene = () => (
  <div className={styles.container}>
    <SearchSuggestions x={100} y={100} />
    <TextToSave x={100} y={500} />
    <Profile x={500} y={100} />
  </div>
)
  