import {describe, expect, test} from '@jest/globals';
import {READMEGenerator} from '../index.js';

describe("Test that the README generator displays the project title as a level 1 header at the top of the README file.", () => {
    test("Creates a README.md file with a title", () => {
        const given = "READMEGenerator";
        const title = new READMEGenerator();
        const readme = title.run();
        expect(readme).toContain("#" + given);
    });
});