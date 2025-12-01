import { Application } from "../../helpers/bootstrap";



Application.start({
    name: 'ApiGateway',
    port: 3000,
    isApiGateway: true
})