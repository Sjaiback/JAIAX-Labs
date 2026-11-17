import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile('src/data/article-experiences.ts', 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const { recommendedPlan, processAdvice, workflowStages } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

assert.equal(recommendedPlan('landing', false), 'basica');
assert.equal(recommendedPlan('extended', false), 'profesional');
assert.equal(recommendedPlan('corporate', false), 'negocio');
assert.equal(recommendedPlan('custom', false), 'avanzada');
for (const scope of ['landing', 'extended', 'corporate', 'custom']) assert.equal(recommendedPlan(scope, true), 'avanzada', 'Integrated payments and inventory require a scoped quote');

const initial = { repeated: false, shared: false, integrations: false, permissions: false };
assert.match(processAdvice(initial).title, /problema/);
assert.match(processAdvice({ ...initial, shared: true }).title, /compartida/);
assert.match(processAdvice({ ...initial, repeated: true }).title, /comprobar/);
assert.match(processAdvice({ ...initial, repeated: true, integrations: true }).title, /integración/);
assert.match(processAdvice({ ...initial, repeated: true, integrations: true, permissions: true }).title, /roles/);

const valid = workflowStages('valid');
assert.equal(valid.length, 4);
assert.match(valid[3].outcome, /completado/);
const missing = workflowStages('incomplete');
assert.match(missing[1].outcome, /revisión/);
assert.equal(missing[2].outcome, 'Sin ejecutar');
assert.notEqual(missing[3].outcome, valid[3].outcome);
const duplicate = workflowStages('duplicate');
assert.match(duplicate[2].detail, /no se crea otro/);
assert.equal(duplicate[3].outcome, 'Sin aviso duplicado');
const unavailable = workflowStages('unavailable');
assert.match(unavailable[2].outcome, /1 registro/);
assert.equal(unavailable[3].outcome, 'Aviso no entregado');
console.log('Interactive article rules OK: plan scopes and overrides, process choices, success, validation stop, duplicate prevention and delivery failure.');
