import {
    Module,
    Global,
    type ModuleMetadata
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SpiderMesh } from "@spider-mesh/core";
import { Http2Rpc, UdpDiscovery } from "@spider-mesh/tcp";
import getPort from "get-port";
import {
    ApiGateway,
    ApiGatewayLinker,
    LivequeryWebsocketSync
} from "@livequery/nestjs";
import { WsAdapter } from "@nestjs/platform-ws";

export class Application {
    static async start({
        name = '?',
        imports = [],
        controllers = [],
        exports = [],
        providers = [],
        isApiGateway
    }: ModuleMetadata & { isApiGateway?: boolean, name?: string }, port?: number) {



        const PORT = await getPort({ port });
        @Global()
        @Module({
            imports,
            controllers: [
                // PromController,
                ...controllers,
                ...isApiGateway ? [ApiGateway] : (
                    controllers.length > 0 ? [ApiGatewayLinker] : []
                )
            ],
            providers: [
                ...providers,
                SpiderMesh,
                Http2Rpc,
                UdpDiscovery,
                ...(controllers.length > 0 || isApiGateway) ? [LivequeryWebsocketSync] : [],
            ],
            exports
        })
        class AppModule { }
        const app = await NestFactory.create(AppModule, {
            rawBody: true,
            bufferLogs: true
        });
        app.useWebSocketAdapter(new WsAdapter(app) as any);
        app.enableCors({});
        // @ts-ignore
        !isApiGateway && controllers.length > 0 && (app as any).useBodyParser('json', { limit: '10mb' })

        await app.listen(PORT, () => {
            !isApiGateway && ApiGatewayLinker.broadcast(name, PORT);
        });
        console.log(`[${name}]  🚀 Application is running on: http://localhost:${PORT}`);


    }

} 