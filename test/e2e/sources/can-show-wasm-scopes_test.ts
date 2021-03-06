// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {assert} from 'chai';
import {describe, it} from 'mocha';

import {click, getBrowserAndPages, step, waitFor} from '../../shared/helper.js';
import {addBreakpointForLine, getScopeNames, getValuesForScope, openSourceCodeEditorForFile, PAUSE_INDICATOR_SELECTOR, RESUME_BUTTON, sourceLineNumberSelector} from '../helpers/sources-helpers.js';

describe('Source Tab', async () => {
  it('shows and updates the module, local, and stack scope while pausing', async () => {
    const {frontend, target} = getBrowserAndPages();
    const breakpointLine = 12;
    let moduleScopeValues: string[];
    let localScopeValues: string[];

    await step('navigate to a page and open the Sources tab', async () => {
      await openSourceCodeEditorForFile('scopes.wasm', 'wasm/scopes.html');
    });

    await step(`add a breakpoint to line No.${breakpointLine}`, async () => {
      await addBreakpointForLine(frontend, breakpointLine);
    });

    await step('reload the page', async () => {
      await target.reload();
    });

    await step('wait for all the source code to appear', async () => {
      await waitFor(await sourceLineNumberSelector(breakpointLine));
    });

    await step('check that the module, local, and stack scope appear', async () => {
      const scopeNames = await getScopeNames();
      assert.deepEqual(scopeNames, ['Module', 'Local', 'Stack']);
    });

    await step('check that the module scope content is as expected', async () => {
      moduleScopeValues = await getValuesForScope('Module');
      // Remove occurrences of arrays.
      const formattedValues = moduleScopeValues.map((line: string) => {
        return line.replace(/\[[^\]]*\]/, '').trim();
      });
      assert.deepEqual(
          formattedValues, ['globals: {imports.global: 24}', 'instance: Instance\xA0{}', 'memory0: Uint8Array(65536)']);
    });

    await step('check that the local scope content is as expected', async () => {
      localScopeValues = await getValuesForScope('Local');
      assert.deepEqual(localScopeValues, ['f32_var: 5.5', 'f64_var: 2.23e-11', 'i32: 42', 'i64_var: 9221120237041090']);
    });

    await step('expand the stack scope', async () => {
      await click('[aria-label="Stack"]');
    });

    await step('check that the stack scope content is as expected', async () => {
      const stackScopeValues = await getValuesForScope('Stack');
      assert.deepEqual(stackScopeValues, []);
    });

    await step('step one time', async () => {
      await frontend.keyboard.press('F9');
      await waitFor(PAUSE_INDICATOR_SELECTOR);
    });

    await step('check that the module scope content is as before', async () => {
      const currentModuleScopeValues = await getValuesForScope('Module');
      assert.deepEqual(currentModuleScopeValues, moduleScopeValues);
    });

    await step('check that the local scope content is as before', async () => {
      const updatedLocalScopeValues = await getValuesForScope('Local');
      assert.deepEqual(updatedLocalScopeValues, localScopeValues);
    });

    await step('check that the stack scope content is updated to reflect the change', async () => {
      const stackScopeValues = await getValuesForScope('Stack');
      assert.deepEqual(stackScopeValues, ['0: 24']);
    });

    await step('resume execution', async () => {
      await click(RESUME_BUTTON);
    });
  });
});
