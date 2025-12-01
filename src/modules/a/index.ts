import { A } from "./A";
import { Application } from "../../helpers/bootstrap";
import { ServiceAController } from "./controller";

Application.start({
    name: 'ServiceA',
    // port: 3001, // Optional: specify a port
    providers: [A],
    controllers: [ServiceAController]
})