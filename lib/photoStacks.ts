import * as cdk from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class PhotoStacks extends cdk.Stack {
    private suffix: string;
    public readonly photosBucketArn: string;
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        this.initializeSuffix();
        const photosBucket = new Bucket(this, 'PhotosBucket', {
            bucketName: `loulou-photos-${this.suffix}`,
        })
        this.photosBucketArn = photosBucket.bucketArn
    }
    private initializeSuffix() {
        const shortId = cdk.Fn.select(2, cdk.Fn.split('/', this.stackId));
        this.suffix = cdk.Fn.select(4, cdk.Fn.split('-', this.stackId));
    }
}
