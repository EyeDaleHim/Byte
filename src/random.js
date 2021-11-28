class RandomCommand extends Command {
    constructor() {
        super('quote', {
           aliases: ['quote', 'q'],
            category: 'Fun',
            description: {
                content: 'Responds with a random number, between minimum and maximum.',
                extended: 'Responds with a random number that the user inputs for the minimum and maximum numbers.'
            }, 
        });
    }
    // i actually never tested this
    function generate()
    {
        
    }
    
    async exec(message, args) {
        const quotes = quotes; 
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        const people = people;
        const person = people[Math.floor(Math.random() * people.length)];
        return message.reply(`**"${quote}"** *** - ${person}***`);
    }
}

module.exports = QuoteCommand;
