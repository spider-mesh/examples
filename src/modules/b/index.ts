import { NestJSLinkMicroservice } from "@spider-mesh/core";
import { B } from "./B";
import { A } from "../a/A";
import { bootstrap } from "../../helpers/bootstrap";

bootstrap({
    providers: [
        B, 
        NestJSLinkMicroservice(A)
    ]
}) 