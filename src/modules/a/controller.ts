import { Controller, Get } from "@nestjs/common";



@Controller('a')
export class ServiceAController {

    @Get('status')
    status() {
        return { status: 'ok', service: 'A' }
    }
}