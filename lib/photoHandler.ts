import * as cdk from 'aws-cdk-lib';
import { Runtime, Code, Function } from 'aws-cdk-lib/aws-lambda';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

interface PhotoHandlerProps extends cdk.StackProps {
    targetBucketArn: string;
}
export class PhotoHandler extends cdk.Stack {
    constructor(scope: Construct, id: string, props: PhotoHandlerProps) {
        super(scope, id, props);
        //this is a lambda function that will be triggered by an S3 event
        new Function(this,'PhotoHandler',{
            runtime: Runtime.NODEJS_16_X,
            handler: 'index.handler',
            code: Code.fromInline(`
                exports.handler = async function(event) {
                    console.log(JSON.stringify(event, null, 2));
                    return { statusCode: 200 };
                
                }`),
            environment: {
                TARGET_BUCKET: props.targetBucketArn
            }
        })
    }

}
