import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {Bucket, CfnBucket} from "aws-cdk-lib/aws-s3";
import {Duration} from "aws-cdk-lib";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
class L3Bucket extends Construct {
  constructor(scope: Construct, id: string){
    super(scope, id);
    new Bucket(this,'l3__bucket',{
      lifecycleRules: [{
        expiration: Duration.days(2)
      }]
    })
  }
}
export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new CfnBucket(this,'l1_stardust_bucket', {
      lifecycleConfiguration: {
        rules: [{
          expirationInDays: 1,
          status: 'Enabled'
        }]
      }
    })
    const duration = new cdk.CfnParameter(this, 'duration', {
      default: 2,
      minLength: 1,
      maxLength: 3,
      type: 'Number'
    })
    new Bucket(this,'l2_stardust_bucket',{
      lifecycleRules: [{
        expiration: Duration.days(duration.valueAsNumber)
      }]
    })
    new L3Bucket(this,'l3_stardust_bucket')
  }
}
