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
  Contact2DType,
  Collider2D,
  IPhysics2DContact,
  AudioSource,
} from "cc";

const { ccclass, property } = _decorator;

import { Ground } from "./Ground";
import { Result } from "./Result";
import { Bird } from "./Bird";
import { PipePool } from "./PipePool";
import { BirdAudio } from "./BirdAudio";

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
    type: PipePool,
  })
  public pipeQuene: PipePool;

  @property({
    type: BirdAudio,
  })
  public clip: BirdAudio;

  @property({
    type: CCInteger,
  })
  public gameSpeed: number = 200;

  @property({
    type: CCInteger,
  })
  public pipeSpeed: number = 200;

  public isOver: boolean;

  onLoad() {
    this.initListner();
    this.result.resetScore();
    this.isOver = true;
    director.pause();
  }

  initListner() {
    // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    this.node.on(Node.EventType.TOUCH_START, () => {
      if (this.isOver == true) {
        this.resetGame();
        this.bird.resetBird();
        this.startGame();
      }

      if (this.isOver == false) {
        this.bird.fly();
        this.clip.onAudioQueue(0);
      }
    });
  }

  // onKeyDown(event: EventKeyboard) {
  //   switch (event.keyCode) {
  //     case KeyCode.KEY_A:
  //       this.gameOver();
  //       break;
  //     case KeyCode.KEY_P:
  //       this.result.addScore();
  //       break;

  //     case KeyCode.KEY_Q:
  //       this.resetGame();
  //       this.bird.resetBird();
  //       break;
  //   }
  // }
  startGame() {
    this.result.hideResults();
    director.resume();
  }

  gameOver() {
    this.result.showResults();
    this.isOver = true;
    this.clip.onAudioQueue(3);
    director.pause();
  }

  resetGame() {
    this.result.resetScore();
    this.pipeQuene.reset();
    this.isOver = false;
    this.startGame();
  }

  passPipe() {
    this.result.addScore();
    this.clip.onAudioQueue(1);
  }

  createPipe() {
    this.pipeQuene.addPool();
  }

  contactGroundPipe() {
    let collider = this.bird.getComponent(Collider2D);

    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    this.bird.hitSomething = true;
    this.clip.onAudioQueue(2);
  }

  birdStruck() {
    this.contactGroundPipe();

    if (this.bird.hitSomething === true) {
      this.gameOver();
    }
  }

  update() {
    if (this.isOver == false) {
      this.birdStruck();
    }
  }
}
