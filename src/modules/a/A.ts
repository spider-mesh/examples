import { Microservice } from '@spider-mesh/core';
import { interval, map, range, take } from 'rxjs'

@Microservice()
export class A {

    sum(a: number, b: number): number {
        console.log(`Calculating sum of ${a} + ${b}`)
        return a + b;
    }



    async asyncSum(a: number, b: number) {
        console.log(`Calculating async sum of ${a} + ${b} ...`)
        await Bun.sleep(3000)
        return a + b
    }

    async interator(count: number) {
        console.log(`Creating iterator for ${count} values`)
        return interval(1000).pipe(
            take(count),
            map(v => v * 2)
        )
    }


}