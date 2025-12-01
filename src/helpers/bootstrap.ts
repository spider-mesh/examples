import { Module, type ModuleMetadata } from "@nestjs/common";
import { NestFactory } from "@nestjs/core/nest-factory";
import { SpiderMesh } from "@spider-mesh/core";
import { Http2Rpc, UdpDiscovery } from "@spider-mesh/tcp";

export const bootstrap = async (metadata: ModuleMetadata) => {
    @Module({
        ...metadata,
        providers: [
            ...metadata.providers || [],
            SpiderMesh,
            Http2Rpc,
            UdpDiscovery
        ]
    })
    class AppModule { }

    const app = await NestFactory.createApplicationContext(AppModule);
    await app.init()
}