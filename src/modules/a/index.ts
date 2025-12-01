import { A } from "./A";
import { Application } from "../../helpers/bootstrap";
import { ServiceAController } from "./controller";

Application.start({
    name: 'ServiceA',
    providers: [A],
    controllers: [ServiceAController]
})