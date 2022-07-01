// assume this is system-defined class
// we don't want to mess with it
class Greetings {
  english() {
    return 'hello';
  }

  spanish() {
    return 'hola';
  }
}

// we want to extend some functions
class MoreGreetings {
  german() {
    return 'gut';
  }

  french() {
    return 'bonjour';
  }
}

const greetings = new Greetings();
const moreGreetings = new MoreGreetings();

// Proxy is included in ES2015, global function
const merged = new Proxy(moreGreetings, {
  // property is the string name of the property being accessed
  get: function (target, property) {
    // if custom object doesn't have the property, fall back
    return target[property] || greetings[property];
  },
});

console.log(merged.french());
console.log(merged.german());
console.log(merged.english());
console.log(merged.spanish());
