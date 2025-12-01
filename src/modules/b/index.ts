import { NestJSLinkMicroservice } from "@spider-mesh/core";
import { B } from "./B";
import { A } from "../a/A";
import { Application } from "../../helpers/bootstrap";
import { ServiceBController } from "./controller";

Application.start({
    name: 'ServiceB',
    // port: 3002 // Optional: specify a port
    providers: [
        B,
        NestJSLinkMicroservice(A)
    ],
    controllers: [ServiceBController]
}) 