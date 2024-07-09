#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStarterStack } from '../lib/cdk-starter-stack';
import { PhotoStacks } from '../lib/photoStacks';
import { PhotoHandler } from '../lib/photoHandler';

const app = new cdk.App();
const photoStack = new PhotoStacks(app, 'PhotosStack', {}
);
new PhotoHandler(app, 'PhotoHandlerStack', {
    targetBucketArn : photoStack.photosBucketArn})
