import {
  _decorator,
  Component,
  Node,
  Vec3,
  UITransform,
  director,
  Canvas,
} from "cc";
const { ccclass, property } = _decorator;

import { GameCtr } from "./GameCtr";

@ccclass("Ground")
export class Ground extends Component {
  @property({
    type: Node,
    tooltip: "Ground 1 is here",
  })
  public ground1: Node;
  @property({
    type: Node,
    tooltip: "Ground 2 is here",
  })
  public ground2: Node = null;

  @property({
    type: Node,
    tooltip: "Ground 3 is here",
  })
  public ground3: Node = null;

  //Create ground with varibales
  public groundWidth1: number;
  public groundWidth2: number;
  public groundWidth3: number;

  public tempStartLocation1 = new Vec3();
  public tempStartLocation2 = new Vec3();
  public tempStartLocation3 = new Vec3();

  public gameCtrlSpeed = new GameCtr();
  public gameSpeed: number;

  onLoad() {
    this.startup();
  }

  startup() {
    this.groundWidth1 = this.ground1.getComponent(UITransform).width;
    this.groundWidth2 = this.ground2.getComponent(UITransform).width;
    this.groundWidth3 = this.ground3.getComponent(UITransform).width;

    this.tempStartLocation1.x = 0;
    this.tempStartLocation2.x = this.groundWidth1;
    this.tempStartLocation3.x = this.groundWidth1 + this.groundWidth2;

    this.ground1.setPosition(this.tempStartLocation1);
    this.ground2.setPosition(this.tempStartLocation2);
    this.ground3.setPosition(this.tempStartLocation3);
  }

  update(deltaTime: number) {
    this.gameSpeed = this.gameCtrlSpeed.gameSpeed;

    this.tempStartLocation1 = this.ground1.position;
    this.tempStartLocation2 = this.ground2.position;
    this.tempStartLocation3 = this.ground3.position;

    this.tempStartLocation1.x -= this.gameSpeed * deltaTime;
    this.tempStartLocation2.x -= this.gameSpeed * deltaTime;
    this.tempStartLocation3.x -= this.gameSpeed * deltaTime;

    const scene = director.getScene();
    const canvas = scene.getComponentsInChildren(Canvas);

    if (this.tempStartLocation1.x <= 0 - this.groundWidth1) {
      this.tempStartLocation1.x = canvas[0].getComponent(UITransform).width;
    }

    if (this.tempStartLocation2.x <= 0 - this.groundWidth2) {
      this.tempStartLocation2.x = canvas[0].getComponent(UITransform).width;
    }

    if (this.tempStartLocation3.x <= 0 - this.groundWidth3) {
      this.tempStartLocation3.x = canvas[0].getComponent(UITransform).width;
    }

    this.ground1.setPosition(this.tempStartLocation1);
    this.ground2.setPosition(this.tempStartLocation2);
    this.ground3.setPosition(this.tempStartLocation3);
  }
}
