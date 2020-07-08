/* eslint-env jest */
/**
 * @fileoverview Enforce anchor elements to contain accessible content.
 * @author Lisa Ring & Niklas Holmberg
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/anchor-has-content';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'Anchors must have content and the content must be accessible by a screen reader.',
  type: 'JSXOpeningElement',
};

ruleTester.run('anchor-has-content', rule, {
  valid: [
    { code: '<div />;' },
    { code: '<a>Foo</a>' },
    { code: '<a><Bar /></a>' },
    { code: '<a>{foo}</a>' },
    { code: '<a>{foo.bar}</a>' },
    { code: '<a dangerouslySetInnerHTML={{ __html: "foo" }} />' },
    { code: '<a children={children} />' },
    { code: '<a title={title} aria-label={ariaLabel} />' },
  ].map(parserOptionsMapper),
  invalid: [
    { code: '<a />', errors: [expectedError] },
    { code: '<a><Bar aria-hidden /></a>', errors: [expectedError] },
    { code: '<a>{undefined}</a>', errors: [expectedError] },
    { code: '<a title={title} />', errors: [expectedError] },
    { code: '<a aria-label={ariaLabel} />', errors: [expectedError] },
  ].map(parserOptionsMapper),
});
