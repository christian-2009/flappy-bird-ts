import * as ex from 'excalibur'
import {Bird} from "../actors/bird";
import {Ground} from "../actors/ground";
import {Pipe} from "../actors/pipe";
import {PipeFactory} from "../factories/pipe-factory";
import {Config} from "../config";

export class Level extends ex.Scene {
    bird: Bird = new Bird()
    ground: Ground
    random = new ex.Random();
    pipeFactory = new PipeFactory(this, this.random, Config.PipeInterval);

    score: number = 0;
    best: number = 0;

    scoreLabel = new ex.Label({
        text: 'Score: 0',
        x: 0,
        y: 0,
        z: 1,
        font: new ex.Font({
            size: 20,
            color: ex.Color.White
        })
    });

    bestLabel = new ex.Label({
        text: 'Best: 0',
        x: 400,
        y: 0,
        z: 1,
        font: new ex.Font({
            size: 20,
            color: ex.Color.White,
            textAlign: ex.TextAlign.End
        })
    });

    override onInitialize(engine: ex.Engine) {
        this.add(this.bird)

        this.ground = new Ground(ex.vec(0, engine.screen.drawHeight - 64))
        this.add(this.ground)

        this.pipeFactory.start()

        this.add(this.scoreLabel);
        this.add(this.bestLabel);

        const bestScore = localStorage.getItem('bestScore')
        if (bestScore) {
            this.best += parseInt(bestScore)
            this.setBestScore(this.best)
        } else {
            this.setBestScore(0)
        }

    }

    incrementScore() {
        this.scoreLabel.text = `Score: ${++this.score}`;
        this.setBestScore(this.score);
    }

    setBestScore(bestScore: number) {
        if (bestScore > this.best) {
            localStorage.setItem('bestScore', this.score.toString());
            this.best = bestScore;
        }
        this.bestLabel.text = `Best: ${this.best}`;
    }
}