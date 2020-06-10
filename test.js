const { say } = require('cowsay')

let log = console.log;

console.log = function(...arguments){
    let args = arguments.join(' ')
    let moo = {
        text: args,
        e: 'oO',
        T: 'U '
    }
    let cowMoo = [say(moo)]
    log.apply(console, cowMoo);
}

console.log('Silly Julie! \nCows go mooo', 'hi')

