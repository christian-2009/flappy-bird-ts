import * as ex from "excalibur";
import {Level} from "../scenes/level";
import {Config} from "../config";
import {Pipe} from "../actors/pipe";
import {ScoreTrigger} from "../actors/score-trigger";

export class PipeFactory {

    private timer: ex.Timer

    constructor(
        private level: Level,
        private random: ex.Random,
        internalMs: number
    ) {
        this.timer = new ex.Timer({
            interval: internalMs,
            repeats: true,
            action: () => this.spawnPipes()
        })
        this.level.add(this.timer)
    }

    spawnPipes() {
        const randomPipePosition = this.random.floating(0, this.level.engine.screen.height - Config.PipeGap)

        const scoreTrigger = new ScoreTrigger(ex.vec(this.level.engine.screen.drawWidth, randomPipePosition), this.level)
        this.level.add(scoreTrigger)

        const bottomPipe = new Pipe(ex.vec(this.level.engine.screen.drawWidth, randomPipePosition + Config.PipeGap), 'bottom')
        this.level.add(bottomPipe)

        const topPipe = new Pipe(ex.vec(this.level.engine.screen.drawWidth, randomPipePosition), 'top')
        this.level.add(topPipe)
    }

    start() {
        this.timer.start();
    }

    reset() {
        for (const actor of this.level.actors) {
            if (actor instanceof Pipe || actor instanceof ScoreTrigger) {
                actor.kill();
            }
        }
    }

    stop() {
        this.timer.stop();
        for (const actor of this.level.actors) {
            if (actor instanceof Pipe || actor instanceof ScoreTrigger) {
                actor.vel = ex.vec(0, 0);
            }
        }
    }
}