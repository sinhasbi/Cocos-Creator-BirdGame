import { _decorator, Component, Node, CCInteger } from "cc";
const { ccclass, property } = _decorator;

import { Ground } from "./Ground";

@ccclass("GameCtr")
export class GameCtr extends Component {
  @property({
    type: Component,
    tooltip: "This is ground",
  })
  public ground: Ground;

  @property({
    type: CCInteger,
  })
  public gameSpeed: number = 300;

  @property({
    type: CCInteger,
  })
  public pipeSpeed: number = 200;

  onLoad() {

  }

  initListner() {
    
  }

  StartGame(){

  }
}
