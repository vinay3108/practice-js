// const obj = {
//     name: "Alice",
//     say: function() {
//       console.log(this.name);
//       setTimeout(function() {
//         console.log(this.name);
//       }, 100);
//     }
//   };
//   obj.say();


// const obj = {
//     name: "Bob",
//     say: function() {
//       const arrow = () => console.log(this.name);
//       arrow();
//     }
//   };
//   obj.say();

// function greet() {
//     console.log("Hi " + this.name);
//   }
//   const person = { name: "Charlie" };
//   const bound = greet.bind(person);
//   bound();


// scope-chain-logger.js
// A simple scope-chain resolver simulator & logger.
// Run with: node scope-chain-logger.js
// This file models scopes, bindings (var/let/const/param/function),
// hoisting/TDZ, and performs step-by-step lookup logging.

class Binding {
    constructor(kind, initialized = false, value = undefined) {
      this.kind = kind; // "var" | "let" | "const" | "function" | "param"
      this.initialized = initialized;
      this.value = value;
    }
  }
  
  class Scope {
    constructor(type, parent = null, name = "") {
      this.type = type; // "global", "function", "block"
      this.parent = parent;
      this.name = name || type;
      this.bindings = new Map();
    }
  
    // Declare a binding. For let/const we typically set initialized=false to
    // simulate TDZ. For var/function/param we usually set initialized=true immediately.
    declare(name, kind, value = undefined, initialized = false) {
      if (this.bindings.has(name)) {
        // re-declaration rules are engine-dependent; here we overwrite for simplicity
      }
      this.bindings.set(name, new Binding(kind, initialized, value));
    }
  
    // Initialize a previously hoisted binding
    initialize(name, value) {
      const binding = this.bindings.get(name);
      if (!binding) {
        throw new Error(`Cannot initialize undeclared binding \"${name}\" in scope ${this.name}`);
      }
      binding.initialized = true;
      binding.value = value;
    }
  }
  
  function lookup(scope, name, { accessType = 'read', typeofSafe = false } = {}) {
    // typeofSafe: emulate the special-case where `typeof undeclared` doesn't throw
    const steps = [];
    steps.push(`Access: ${accessType} \"${name}\"`);
  
    let current = scope;
    let depth = 0;
  
    while (current) {
      steps.push(` -> check scope \"${current.name}\" (${current.type})`);
  
      if (current.bindings.has(name)) {
        const binding = current.bindings.get(name);
  
        // TDZ check for let/const
        if (!binding.initialized && (binding.kind === 'let' || binding.kind === 'const')) {
          steps.push(`    Found binding in \"${current.name}\" but it is in TDZ (kind=${binding.kind})`);
          const output = steps.join('\n');
          console.log(output);
          throw new ReferenceError(`${name} is not initialized`);
        }
  
        steps.push(
          `    Found \"${name}\" in \"${current.name}\" (kind=${binding.kind}, value=${JSON.stringify(binding.value)})`
        );
  
        const output = steps.join('\n');
        console.log(output);
  
        // For writes, update the binding
        if (accessType === 'write') {
          binding.value = arguments.length >= 4 ? arguments[3] : undefined;
        }
  
        return binding.value;
      }
  
      steps.push(`    Not found in \"${current.name}\" → moving to parent`);
      current = current.parent;
      depth++;
    }
  
    // Not found in any lexical scope
    if (typeofSafe && accessType === 'read') {
      steps.push(` -> Not found in any scope — typeof-safe read returns \"undefined\"`);
      console.log(steps.join('\n'));
      return 'undefined';
    }
  
    steps.push(' -> Not found in any scope! ReferenceError');
    console.log(steps.join('\n'));
    throw new ReferenceError(`${name} is not defined`);
  }
  
  // Example simulation builder + run
  function buildExampleScopes() {
    // Global scope
    const globalScope = new Scope('global', null, 'global');
    // Simulate: var g = 10; (hoisted, initialized to undefined then set)
    globalScope.declare('g', 'var', undefined, true);
  
    // Outer function scope
    const outer = new Scope('function', globalScope, 'outer');
    // var a;  (hoisted, initialized = true -> undefined)
    outer.declare('a', 'var', undefined, true);
    // let b;  (hoisted, in TDZ until initialized)
    outer.declare('b', 'let', undefined, false);
    // function fn() {} -> hoisted as initialized function
    outer.declare('fn', 'function', () => 'fn', true);
  
    // Inner function scope
    const inner = new Scope('function', outer, 'inner');
    // const c; (TDZ)
    inner.declare('c', 'const', undefined, false);
  
    return { globalScope, outer, inner };
  }
  
  function simulateExample() {
    const { globalScope, outer, inner } = buildExampleScopes();
  
    console.log('\n--- Before any initializations ---');
    try {
      lookup(inner, 'a'); // var a exists but may be undefined
    } catch (e) {
      console.log('  ERROR:', e.message);
    }
  
    try {
      lookup(inner, 'b'); // b is TDZ -> ReferenceError
    } catch (e) {
      console.log('  ERROR:', e.message);
    }
  
    try {
      lookup(inner, 'fn'); // function hoisted
    } catch (e) {
      console.log('  ERROR:', e.message);
    }
  
    // Initialize some bindings as if execution reached their lines
    console.log('\n--- Initializing outer.a = 1 and outer.b = 2 and inner.c = 3 ---');
    outer.initialize('a', 1);
    outer.initialize('b', 2);
    inner.initialize('c', 3);
  
    console.log('\n--- After initializations ---');
    lookup(inner, 'a');
    lookup(inner, 'b');
    lookup(inner, 'c');
  
    console.log('\n--- typeof on undeclared name (typeofSafe) ---');
    lookup(inner, 'nonexistent', { typeofSafe: true });
  
    console.log('\n--- Attempt to access undeclared (should throw) ---');
    try {
      lookup(inner, 'xyz');
    } catch (e) {
      console.log('  ERROR:', e.message);
    }
  }
  
  if (require.main === module) {
    // Run the demo when executed directly
    simulateExample();
  }
  
  // Exports for programmatic use
  module.exports = {
    Binding,
    Scope,
    lookup,
    buildExampleScopes,
    simulateExample,
  };
  