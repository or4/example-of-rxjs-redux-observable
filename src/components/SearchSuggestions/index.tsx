import * as React from "react";
const styles = require('./styles.scss');
import { DraggableBlock } from ':components/DraggableBlock';
import { getSuggestions } from ':api';
import { Subject, Subscription, of, timer, concat } from "rxjs";
import { switchMap, catchError } from "rxjs/operators";

interface Props {
  x?: number;
  y?: number;
}

interface State {
  suggestions: string[];
}

export class SearchSuggestions extends React.PureComponent<Props, State> {
  searchText: Subject<string>;
  subscription: Subscription;
  constructor(props: Props) {
    super(props);
    this.state = {
      suggestions: []
    }
    this.searchText = new Subject();
    this.subscription = this.searchText.pipe(
      switchMap(text => concat(
        of([]),
        getSuggestions(text).pipe(
          catchError(() => of([]))
        )
      )),
    ).subscribe((data: string[]) => this.setState({ suggestions: data }))
  }
  componentWillUnmount() {
    this.subscription.unsubscribe()
  }
  render() {
    return (
      <DraggableBlock x={this.props.x} y={this.props.y}>
        <div className={styles.container}>
          <input
            type='text'
            onChange={(e) => this.searchText.next(e.target.value)}
          />
          {
            this.state.suggestions.length > 0 ?
              <div className={styles.suggestions}>
                {this.state.suggestions.map(el => <p key={el}>{el}</p>)}
              </div> :
              null
          }
        </div>
      </DraggableBlock>
    );
  }
}
