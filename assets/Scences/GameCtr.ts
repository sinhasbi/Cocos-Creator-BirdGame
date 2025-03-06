import {
  _decorator,
  Component,
  Node,
  CCInteger,
  input,
  Input,
  EventKeyboard,
  KeyCode,
  director,
} from "cc";

const { ccclass, property } = _decorator;

import { Ground } from "./Ground";
import { Result } from "./Result";
import { Bird } from "./Bird";

@ccclass("GameCtr")
export class GameCtr extends Component {
  @property({
    type: Component,
    tooltip: "This is ground",
  })
  public ground: Ground;

  @property({
    type: Result,
    tooltip: "This is results",
  })
  public result: Result;

  @property({
    type: Bird,
    tooltip: "This is bird",
  })
  public bird: Bird;

  @property({
    type: CCInteger,
  })
  public gameSpeed: number = 50;

  @property({
    type: CCInteger,
  })
  public pipeSpeed: number = 100;

  onLoad() {
    this.initListner();
    this.result.resetScore();
    director.pause();
  }

  initListner() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    this.node.on(Node.EventType.TOUCH_START, () => {
      this.bird.fly();
    });
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        this.gameOver();
        break;
      case KeyCode.KEY_P:
        this.result.addScore();
        break;

      case KeyCode.KEY_Q:
        this.resetGame();
        this.bird.resetBird();
        break;
    }
  }
  startGame() {
    this.result.hideResults();
    director.resume();
  }

  gameOver() {
    this.result.showResults();
    director.pause();
  }

  resetGame() {
    this.result.resetScore();
    this.startGame();
  }
}
