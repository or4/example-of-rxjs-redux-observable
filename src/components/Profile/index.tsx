import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
const styles = require('./styles.scss');
import { DraggableBlock } from ':components/DraggableBlock';
import { GlobalState, Session } from ':types';
import { ActionCreators } from ":actions";


interface Props {
  x?: number;
  y?: number;
  session: Session;
  logIn: () => void;
  logOut: () => void;
}


export const Profile = ({ x, y, session, logIn, logOut }: Props) => (
  <DraggableBlock x={x} y={y}>
    <div className={styles.container}>
      <img
        src={session.photo}
      />
      <p>{session.name}</p>
      <button onClick={logIn}>log in</button>
      <button onClick={logOut}>log out</button>
    </div>
  </DraggableBlock>
);

const mapStateToProps = ({ session }: GlobalState) => ({
  session
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  logIn: ActionCreators.logIn,
  logOut: ActionCreators.logOut
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
