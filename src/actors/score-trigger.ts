import {Actor} from "excalibur";
import {Level} from "../scenes/level";
import * as ex from 'excalibur'
import {Config} from "../config";

export class ScoreTrigger extends Actor {
    constructor(pos: ex.Vector, private level: Level) {
        super({
            pos: pos,
            width: 32,
            height: Config.PipeGap,
            anchor: ex.vec(0,0),
            vel: ex.vec(Config.PipeSpeed, 0),
        })

        this.on('exitviewport', () => {
            this.kill();
        });
    }

    override onCollisionStart() {
        this.level.incrementScore()
    }

}