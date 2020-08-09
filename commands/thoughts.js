var mainjs = require('../fn.js');
const fn = require('../fn.js');

module.exports = {
    name: 'thoughts',
    description: 'Do you ever just have a thought???',
    usage: "",
    permissions: [],
    cooldown: 3,
    guild: false,
    async execute(message, packet, client) {
        var thoughts = ["Do you ever just 任天堂の楽しみは無限大です",
        "No!",
        "Can we just cancel Jim? That fucker ruins everything!", 
        "steve", 
        "Let's rotate!", 
        "Going A.", "Going B.", "Going C.", 
        "Who put the bomp in the bomp sha bomp sha bomp??", 
        "The ninja dog bites hard!", 
        "The doggy bite hard!",
        "My dog bites you hard!", 
        "The smallest dog shoots the biggest gun!", 
        "My dogs are very fancy.",
        "The fancy dog gets the shrimp!",
        "I don't even know what the fuckin... original voice line is anymore.",
        "The dog is the fanciest of animals.",
        "They're doin' a sequel? They're doin' Waldo 2?",
        "Sonic; Sega makes this.", "Mario; Nintendo makes this.",
        "'Garfield has been found', huh, well it's about damn time!",
        "For you, Bart? For you, Bart, I'll do this.",
        "Now, If I believe- the last time I played this game I believe Apu's store was somewhere down here. This is where he-",
        "\"Hey Donkey, have you seen Biscuits?\"\nI don't know where that god damn shit is man ... god ... fuck\nTry asking the chicken",
        "I don't think that's John Wick",
        "it's just a fa' li'ul penguin",
        "This game is not designed for use on this system - Please insert an NTSC-U cartridge",
        "Blowing Up My Neighbour",
        "A wild **burg** appeared!",
        "The Never-Ending Nightmare Of Nikocado Avocado - From Vegan To Villain",
        "Built: Different | Sex: All of It | Location: Hell, Michigan | Homies: exual",
        "Oh shit, they found my poop sock", "Joe Swimming", "Who the Fk Is Joe?", "Dame Dane Dame Yo Dame Nano Yo",
        "var myStr = 0", "ERROR", "hi vivida, hi loogi", "It's 2 in the morning", "when you forgot to add comma", 
        "thoughts.js", "jump into fucking paintings; how is that logic", "Ass Paper? Ass Paper.", 
        "Have you guys ever tried JavaScript? Me neither.", "Minecraft kid screaming", "Ay yo, the pizza here! OH! MY EARS BURN!", 
        "\"White people be like:\"\nAy Yo! The Pizza Here!\nFart sound effect PUSSY\nThis noder really think he's a JavaScript master\n",
        "i love parappa", "when_the_moon_hits_you_eye_like_a_big_pizza.py"];
        var thought = thoughts[Math.floor(Math.random() * thoughts.length)];
        message.channel.send(fn.sMsg(`:thought_balloon:  ${thought}`));
    },
};