import {APIGatewayEvent, APIGatewayProxyResult, Context} from "aws-lambda";


export const mySubFun = ( param:string ):string => {

    return param + '-' + param;

};


export const handler = async ( event: APIGatewayEvent, context: Context ): Promise<APIGatewayProxyResult> => {

    console.log("Another Invoke", event );

    const subFunParam = ( event.queryStringParameters && event.queryStringParameters.name ) ? event.queryStringParameters.name : "default";

    const body = { a : 123, mySubFun : mySubFun(subFunParam) };

    return {
        statusCode: 200,
        body: JSON.stringify( body )
    }
};