import * as ex from "excalibur";
import {Ground} from "./ground";

export class Bird extends ex.Actor {
    constructor() {
        super({
            pos: ex.vec(200, 300),
            width: 16,
            height: 16,
            color: ex.Color.Yellow
        })
    }

    jumping = false

    override onInitialize(): void {
        this.acc = ex.vec(0, 1200);
    }

    override onCollisionStart(_self: ex.Collider, other: ex.Collider): void {
        if (other.owner instanceof Ground) {
            this.stop();
        }
    }

    private isInputActive = (engine: ex.Engine) => engine.input.keyboard.isHeld(ex.Keys.Space)

    override onPostUpdate(engine: ex.Engine) {
        if (!this.jumping && this.isInputActive(engine)) {
            this.vel.y += -800;
            this.jumping = true;
        }

        if (!this.isInputActive(engine)) {
            this.jumping = false;
        }

        if (!this.jumping) {
            this.acc = ex.vec(0, 1200);
        }

        this.vel.y = ex.clamp(this.vel.y, -500, 500);

        this.rotation = ex.vec(200, this.vel.y).toAngle();
    }

    stop() {
        this.vel = ex.vec(0, 0);
        this.acc = ex.vec(0, 0)
    }

}