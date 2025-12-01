import { Controller, Get } from "@nestjs/common";

@Controller('b')
export class ServiceBController {

    @Get('status')
    status() {
        return { status: 'ok', service: 'B' }
    }
}