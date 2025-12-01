import type { RemoteService } from "@spider-mesh/core";
import { A } from "../a/A";
import { Inject, Injectable } from "@nestjs/common";
import { lastValueFrom, tap } from "rxjs";


@Injectable()
export class B {
    constructor(
        @Inject(A) private a: RemoteService<A>
    ) { }

    onModuleInit() {
        this.test()
    }

    async test() {

        console.log('Wait service A online')
        await this.a.wait()

        console.log(`Service A online`)

        const a = 1
        const b = 2

        const sum = await this.a.sum(a, b)
        console.log(`Sum ${a} + ${b} = ${sum}`)

        const asyncSum = await this.a.asyncSum(a, b)
        console.log(`Async Sum ${a} + ${b} = ${asyncSum}`)

        console.log(`Iterator 5 values:`)
        await lastValueFrom(
            this.a.interator(5).pipe(
                tap(v => console.log(` Emitted value: ${v}`))
            )
        )
    }
}