import { Application } from "../../helpers/bootstrap";



Application.start({
    name: 'ApiGateway',
    isApiGateway: true
}, 3000)