import * as React from "react";
import { Subject, Observable, fromEvent } from "rxjs";
import { mergeMap, takeUntil, map, scan, filter, pairwise, tap } from "rxjs/operators"
const styles = require('./styles.scss');


interface Props {
  x?: number;
  y?: number;
  children?: any;
}
interface State {
  x: number;
  y: number;
}

export class DraggableBlock extends React.PureComponent<Props, State> {
  start: Subject<void>;
  move: Observable<MouseEvent>;
  finish: Subject<void>;
  constructor(props: Props) {
    super(props);
    this.state = {
      x: props.x || 0,
      y: props.y || 0
    }

    this.start = new Subject();

    this.move = (fromEvent(window, 'mousemove') as Observable<MouseEvent>);
    this.finish = new Subject();

    this.start.pipe(
      mergeMap(() => this.move.pipe(
        takeUntil(this.finish),
        map(e => ({
          x: e.clientX,
          y: e.clientY
        })),
        pairwise(),
        map(e => ({
          x: e[1].x - e[0].x,
          y: e[1].y - e[0].y,
        }))
      )),
    ).subscribe(e => {
      this.setState({
        x: this.state.x + e.x,
        y: this.state.y + e.y
      });
    });
  }

  render() {
    return (
      <div
        style={{ transform: `translate(${this.state.x}px, ${this.state.y}px)` }}
        className={styles.element}
        onMouseDown={(e) => { e.preventDefault(); this.start.next() }}
        onMouseUp={(e) => { e.preventDefault(); this.finish.next() }}
      >
        <div
          onMouseDown={(e) => { e.stopPropagation() }}
          onMouseUp={(e) => { e.stopPropagation() }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
