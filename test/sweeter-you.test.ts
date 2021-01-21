import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as SweeterYou from '../lib/sweeter-you-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SweeterYou.SweeterYouStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
