#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SweeterYouStack } from '../lib/sweeter-you-stack';

const app = new cdk.App();
new SweeterYouStack(app, 'SweeterYouStack');
