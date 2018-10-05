import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
const styles = require('./styles.scss');
import { DraggableBlock } from ':components/DraggableBlock';
import { GlobalState } from ':types';
import { ActionCreators } from ":actions";


interface Props {
  x?: number;
  y?: number;
  textToSave: string;
  changeTextToSave: (text: string) => void
}


export const TextToSave = ({ x, y, textToSave, changeTextToSave}: Props) => (
  <DraggableBlock x={x} y={y}>
    <div className={styles.container}>
      <textarea
        placeholder="text to save"
        value={textToSave}
        onChange={(e) => { changeTextToSave(e.target.value) }}
      />
    </div>
  </DraggableBlock>
);

const mapStateToProps = ({ textToSave }: GlobalState) => ({
  textToSave
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  changeTextToSave: ActionCreators.changeTextToSave
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TextToSave);
