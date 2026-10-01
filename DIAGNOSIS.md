# CI Failure Diagnosis

## 1. Discount assertion

- **Step:** `Run tests`
- **Error:** `Expected: 100` and `Received: 90` at `src/payments/calculateDiscount.test.js:8`.
- **Cause:** `calculateDiscount(100, 10)` correctly subtracts ten percent and returns `90`. The test expected the original price, so the assertion was wrong. The test now expects `90`.

## 2. Currency object matcher

- **Step:** `Run tests`
- **Error:** `expect(received).toBe(expected) // Object.is equality`, followed by `If it should pass with deep equality, replace "toBe" with "toStrictEqual"` at `src/utils/formatCurrency.test.js:5`.
- **Cause:** `toBe` compares object identity, but `formatCurrency` returns a newly created object. The assertion needed a deep-equality matcher, so it now uses `toEqual`.

## 3. Dependency lockfile mismatch

- **Step:** `Install dependencies`
- **Error:** ``npm ci can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync`` and `Missing: lodash@4.18.1 from lock file`.
- **Cause:** `package.json` declares `lodash`, but the committed lockfile did not contain the matching package entry. This makes clean installs fail. The lockfile is regenerated and the workflow uses `npm ci` so CI installs exactly the committed dependency tree.

## 4. Test-job sequencing and workspace setup

- **Step:** `Run tests`
- **Error:** The job ran `npm test` without `actions/checkout`, without installing dependencies, and without `needs: install`; on a fresh runner the test workspace therefore has no checked-out `package.json` or `node_modules` available to the job.
- **Cause:** GitHub Actions jobs run on separate fresh runners. Job-level filesystem state is not shared automatically, so the test job must check out the repository and install its dependencies. `needs: install` also makes the intended job order explicit. The workflow now performs those steps before running tests.