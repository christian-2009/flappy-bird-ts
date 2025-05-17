import * as ex from "excalibur";
import {Config} from "../config";

export class Pipe extends ex.Actor {
    constructor(pos: ex.Vector, type: 'top' | 'bottom') {
        super({
            pos,
            width: 32,
            height: 1000,
            color: ex.Color.Green,
            vel: ex.vec(Config.PipeSpeed, 0),
            anchor: type === 'top' ? ex.vec(0,1) : ex.vec(0,0),
            z: -1
        });

        this.on('exitviewport', () => this.kill());
    }
}