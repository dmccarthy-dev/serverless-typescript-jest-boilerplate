import { MockProxy, mock } from 'jest-mock-extended';
import {APIGatewayEvent, APIGatewayProxyResult, Context} from "aws-lambda";

import { handler, mySubFun } from '../src/hello'


describe( 'Test hello.js', ()=>{

    let context: MockProxy<Context>;


    beforeEach(()=>{
        context = mock<Context>();
    });


    test('should get REST response object', async () => {

        const event   = {} as APIGatewayEvent;
        const context = {} as Context;

        const res:APIGatewayProxyResult = await handler( event, context );

        expect( res.statusCode         ).toEqual(  200 );
        expect( res.body               ).toEqual(  "{\"a\":123,\"mySubFun\":\"default-default\"}" );
        expect( JSON.parse( res.body ) ).toEqual(  { a:123, mySubFun : "default-default" }        );

        expect( await handler( event, context ) ).toEqual(  {
            "body": "{\"a\":123,\"mySubFun\":\"default-default\"}",
            "statusCode": 200,
        } );

    });


    test('should get different result with param', async () => {

        const mockEvent = mock<APIGatewayEvent>();

        mockEvent.queryStringParameters = { name : "test" };

        const context   = {} as Context;

        const res:APIGatewayProxyResult = await handler( mockEvent, context );

        expect( res.statusCode         ).toEqual(  200 );
        expect( res.body               ).toEqual(  "{\"a\":123,\"mySubFun\":\"test-test\"}" );
        expect( JSON.parse( res.body ) ).toEqual(  { a:123, mySubFun : "test-test" }        );

    });


    test('should test mySubFun', async () => {

        const res:string = await mySubFun( "asdf" );

        expect( res ).toEqual(  "asdf-asdf" );

    });

} );
