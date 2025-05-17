import * as ex from "excalibur";
import {Ground} from "./ground";
import {Pipe} from "./pipe";
import {Config} from "../config";

export class Bird extends ex.Actor {
    constructor() {
        super({
            pos: Config.BirdStartPos,
            radius: 8,
            color: ex.Color.Yellow
        })
    }

    jumping = false

    override onInitialize(): void {
        this.acc = ex.vec(0, Config.BirdAcceleration);
    }

    override onCollisionStart(_self: ex.Collider, other: ex.Collider): void {
        if (other.owner instanceof Ground || other.owner instanceof Pipe) {
            this.stop();
        }
    }

    private isInputActive = (engine: ex.Engine) => engine.input.keyboard.isHeld(ex.Keys.Space)

    override onPostUpdate(engine: ex.Engine) {
        if (!this.jumping && this.isInputActive(engine)) {
            this.vel.y += Config.BirdJumpVelocity;
            this.jumping = true;
        }

        if (!this.isInputActive(engine)) {
            this.jumping = false;
        }

        if (!this.jumping) {
            this.acc = ex.vec(0, Config.BirdAcceleration);
        }

        this.vel.y = ex.clamp(this.vel.y, Config.BirdMinVelocity, Config.BirdMaxVelocity);

        this.rotation = ex.vec(200, this.vel.y).toAngle();
    }

    stop() {
        this.vel = ex.vec(0, 0);
        this.acc = ex.vec(0, 0)
    }

}