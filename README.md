# browsersnake
ChatGPT and I are pair programming on a browser implementation of the game snake. You can enjoy the game here: https://mwillerich.github.io/browsersnake/snake.html

## Progress log
### [75e006d](https://github.com/mwillerich/browsersnake/commit/75e006d5a40719241457da1b695a3e1f35a41980) first implementation suggestion

We talk about easy-to-implement browser games using HTML, CSS and Javascript. ChatGPT gives me a few options and we settle on snake. Pong would've also been cool, but that's for another day. ChatGPT gives me its first suggestion of what an implementation could look like. 

Right off the bat an issue shows up that keeps on happening: The response is cut off mid-code, and it's down to me to prompt ChatGPT to continue its code. So, in 2 pieces, copy, paste, it works.

### [ab810a2](https://github.com/mwillerich/browsersnake/commit/ab810a25d83fa9420740ee87418ba2255697d290) adding styles, moving css to separate file

I ask for "more pretty" styles, and get this set of CSS, with the suggestion to put it into an external file. I silently deviated from the naming and closed the tag as well. I noticed that the instructions don't actually match the HTML structure, it references a few ids that don't exist. We don't discuss it at this point, though.

### Excursion: when integrating sound means sneaking in code changes

What's a game containing collision detection without a collision sound? I have an idea what I'd like to integrate, but it's more for a later stage. ChatGPT suggests the changes in HTML (using an `audio` element) and a code snipped in JS. It's interesting to see that it quietly sneaks in the HTML elements that the CSS referenced. I don't use the code changes for now, as I still need to dig for the sound file I was thinking of.

But I do want to make that insinuated score counter visible, so I prompt ChatGPT on how to add a score counter. The response suggests to "modify the `createFood()` function in snake.js to update the score". But I have neither moved Javascript to an external file (ok, fine, it was already implicitly suggested in the code snippets about adding sound), nor has our joint work a `createFood()` function. 

Sorry, ChatGPT, we need to talk about this. But my remark that we don't have this function only gets ChatGPT to double down on its alternative reality: "I apologize for the confusion. I assumed that you were using the code I provided earlier, which included a `createFood()` function.". No, ChatGPT, no, it doesn't. We bicker a bit about it, and, as is typical for ChatGPT v3.5, it changes position like a nervous song bird on a cool spring day. It moves to "I did not provide a `createFood()` method in the original code that I posted." and tries to make good by posting some code snippets on how to add it. It goes without saying that those snippets reference other methods that we didn't set up earlier either.

I respond by doing what I do best: Leaving the conflict without a conclusion, change topic entirely, and we debate the very awesome old Amiga game Cyber Empire, where the player controls robots to wage a terrible war. I mean, we need to keep reminding each other of that balance, right? Sure, laser away half a city and turn all enemy robots into heaps of smoking trash; together we will achieve world domination (actually I think it's just an island or a continent in the game), but I'm still your boss.

Back to browsersnake. If ChatGPT keeps forgetting what our project currently looks like, then I should tell it where I am right now, so we can continue from that stage. It tells me how I should mark up code, but in the chat interface it doesn't actually interpret my markup, a lot of triple backticks are being exchanged unparsed. But I notice that it does understand me correctly, I give up and we move on.

### [5ed18d4](https://github.com/mwillerich/browsersnake/commit/5ed18d45e13238d54dbd6136a6bbb8263ec51088) moving js to external file

In order to cater to ChatGPT's inability to reliably complete long answers, and maybe also to keep things tidy, I move the existing, working JS into a separate file, and share the contents in our conversation, asking for a rewrite of it, using "a more modern structure of having an `init()` function and an object". Has anyone noticed yet that I haven't written code for so long that I don't even remember the correct terminology of things anymore? Well, we don't get the pairing partner we deserve, but the one that has time to spare, so if I have to deal with a forgetful AI that sometimes appears to look out the window and stop responding mid-sentence, I can be its human counterpart that hasn't touched a line of Javascript in 5+ years.

### [a732076](https://github.com/mwillerich/browsersnake/commit/a7320769ed8ca96b1a404774a9bbe696d73fd071) js object encapsulation

We're getting somewhere! After no less that 5 attempts to send back the entire set of Javascript code, rewritten so that variables and functions are encapsulated in an object, I finally have some code structure I recognize as "tidy" from my final days as active software engineer. The path to this commit was rocky, requests to "please continue", or to continue at the point where it probably heard a digital ice-cream truck stopping on AI school grounds all fail. The code from this commit weirdly comes as one single complete response including a brief explanation, helping me remember some of the terminology.

For transparency's sake, this is the point when I thought it'd be fun to write all this up and share both code and experience with others, so if this were a film with a flashback, we have now arrived in the present! I had ChatGPT confirm my hunch that we want a MIT license on the project, and created the repository, all these commits and words.

### [5978a92](https://github.com/mwillerich/browsersnake/commit/5978a9256ae9c9b6288249c95d9a0905fafe0b73) extract collision check

As ChatGPT kept referencing a `checkCollision()` method that didn't exist, I thought of this peace offering as next step. Hey, if it exists, maybe we can become better collaborators. At this point, I had it explain the inline code it had generated for this, and it did a great job. Except that it confidently explained 4 out of 5 checks and sat down as if we were finished. So lazy. But, asking again, it was able to explain the last part about colliding with itself, too.

### [715063a](https://github.com/mwillerich/browsersnake/commit/715063a451b559ba275cc3493dfa5e1a48d83254) added collision sound 

Yesterday I fired up Garageband and the minibit plug-in to create a few 8-bit-ish game sounds. Right now only the collision sound matches my expectation and the current stage of the game, so I take ChatGPT's earlier suggestions and implement it as HTML audio element, and load and trigger it in the now existing collision routine. It works fine as a first attempt, so into a commit it goes. I test, commit and push and tell ChatGPT about it. It has an improvement suggestion to preload the sound, something that I noticed as improvable during testing. The emotional complexity of doing exactly to the letter what the machine told me, only for it to turn around and tell me that there's a better way is impressive. Like, why didn't you tell me before? This isn't "explain it to me like I'm five, and then explain it to me again like I'm 35, with _that_ look on your robot face, judging my very basic results".

### [ce4a10a](https://github.com/mwillerich/browsersnake/commit/ce4a10a) preloading audio

Finally, in my previous commit I also cross the point where skipping the creation of a `.gitignore` was a mistake and I commit some garbage. I'm fixing it and notice that I didn't ask ChatGPT about it. After dealing with my emotions that were so rudely ruffled by an AI, I follow ChatGPT's advice on preloading the audio. Its advice is a little messy, it first suggests to create another audio element in the DOM via Javascript, defining its src there, and attaching the `canplaythrough` listener to that. When I criticize the approach, it first claims that loading it twice is intentional ("fallback content"), and when I don't buy it, it wants to remove the HTML audio element. I decline again, as I want my source management only in the HTML file, at least for as long as I can. Eventually, after four attempts, it gives me the desired code, referencing the existing audio element and adding the event listener.

I'm starting to think that it has forgotten what our code looks like. Some probing reveals that it's inconsistent in its memory of our work. I'd like to just send it diffs, as our relationship doesn't expand to the realm of me screensharing. For now, we work in parallel universes, and I need to jog its memory at a point in the near future.

In parallel I'm doing small things to improve my tooling. I now generate the headlines for these log entries (`git log --oneline -1 | sed -E 's/([a-z0-9]*)/### [\1](https:\/\/github.com\/mwillerich\/browsersnake\/commit\/\1)/'`), and have added the git aliases that I recalled from my work with it in the early 2010s. `git ci`, `git st` and friends, welcome back.

### [a0b56d8](https://github.com/mwillerich/browsersnake/commit/a0b56d8) adding a score counter

Next up we implement the score counter. ChatGPT gives a thorough first explanation on how it would do it. As usual, the explanation is useful, the reference points, where code would be added, are off (non-existing methods, typically). We slow-dance our way towards keeping the text content of a `div` outside the canvas up to date with the scores, and add some CSS for centering; from here on I don't insist anymore that ChatGPT suggests to me the exact code that I'm adding to the source. It forgets that I wanted the score next to the canvas. Tomayto tomahto, I put the changes in the way I think is best.

### Excursion: using collaborative tools

And then we talk about it. I learn about ChatGPT using the current session's conversation plus pre-existing knowledge to come up with answers, but that there's no guarantee it can access the whole session at the point of answering, and that its context fluctuates from answer to answer. The next few sentences are interesting, though:

> However, there are some strategies we can use to make sure that important information is not forgotten.
> 
> One way is to summarize key points or decisions we make during the conversation and repeat them back to each other to confirm understanding. Another way is to use a collaborative tool, such as a shared document or note-taking app, to keep track of important information and decisions made during our conversation.
> 
> In addition, if you have specific information or instructions that you want me to remember throughout the session, you can always remind me of it by providing the necessary context.

Whaaat, we can use collaborative tools? ChatGPT starts fumbling. I can't do this, I'm an AI, I can't do that, etc. And: 

> I do not have the ability to access or retrieve information outside of this conversation or interact with any external data sources without explicit permission and authorization.

So after giving it permission to look at the public website https://github.com/mwillerich/browsersnake/, I am able to get it to confirm whether our latest changes for the score were already pushed or not. Maybe it took a confident 50/50 chance, but it was correct. Asking it to repeat the content of snake.html on github.com works, although, in five attempts there is some creative licence in it each time. But at least I now know how to remind it of the current state of the code when asking for the next development step.

### [045773a](https://github.com/mwillerich/browsersnake/commit/045773a) avoiding food collisions

Before starting the day job, I wanted to tidy up something I had noticed while testing: Food would sometimes be placed on the snake's body. We can't have that, so I ask for an improvement to this. By now the suggestions and real code base deviate with every response, and I need to amend any suggestions to make it work. What's sad is that the first suggestion often appears to be more elegant than what we settle for in the end, ChatGPT seems to mentally be doing code optimisations that don't exist _yet_.

It's fun to test this food collision avoidance, as the chances are not that great, even with reducing the area of where it can be placed.

<img width="1072" alt="Plenty of food collisions detected" src="https://user-images.githubusercontent.com/486892/232417031-3f3469f4-9908-4a0c-91ea-2276a726fa4d.png">

### [3392c18](https://github.com/mwillerich/browsersnake/commit/3392c18) lets add a face to the snake

As a next step I felt some customization was necessary. My kids were not impressed with this monumental coding effort, so I got one of them involved and she produced the snake's head for me to digitize and integrate. As in my last few active years as a developer I was only working on the server side, we touched upon something I've never done: Working with the canvas element. I had a paper drawing for the head and no idea how to best integrate it.
ChatGPT, maybe due to terminology, first suggested I want to create 20x20 bitmap array, but broke down while sending the syntax for an array of arrays with 400 values. Then it confused the `drawSquare()` method to be able to draw single pixels, and I abandoned that idea. Let's just use a .png. I created the file, and we took it from there. It took 11 rounds, with one significant off-by-one mistake on my side and many I-can't-remember-what-I-last-said mistakes on ChatGPT's side, and in the end I used a routine from Stack Overflow, until the snake had a head, connected to its body, after any turn in any direction. My desire to get this working was stronger than my desire to make sense out of ChatGPT's drivel, or rather, to first adopt and then debug its suggestions. On the plus side, once I had mostly copy&pasted my way to a working solution that I mostly, vaguely, understood, ChatGPT was able to explain quite well what that code does. 

https://user-images.githubusercontent.com/486892/232804326-40f01fb9-113d-4e1e-91ac-8648792a92ba.mov

### [690954a](https://github.com/mwillerich/browsersnake/commit/690954a) levelling up
We have levels! Well, _I_ have levels, I actually didn't ask ChatGPT about this, and I notice how the coding feels different:

- Let's face it, this is still fairly trivial, easy-to-grasp code. It feels much quicker to add these changes by hand.
- But the changes are immediately more messy. It's all in a trying-out-if-this-works style, and then an idea comes along, and then that one function keeps expanding further an further
- Ok, let's break this area into smaller chunks. Here the need for cleanliness kicks back in, and I move all constants to the top. So much easier to test!
- And scope creep strikes again, during testing I start fiddling with the boundaries of when a new level is reached, and how much faster the game should become every level. I don't even recall when I agreed with myself that I'm deviating from the idea of levels, originally I wanted to put obstacles into the field. Changing cycle speed was easier, I guess.

So, with this commit, I was able to change the game experience by quite a bit, it felt light (compared to the canvas mess anything feels light!), but boy did I not check myself. The pride of a clean codebase is gone. Maybe it's a good idea to have ChatGPT look after this code after all.

### [84d7b52](https://github.com/mwillerich/browsersnake/commit/84d7b52) queueing keypress events to prevent owlface
This is the second of two bugs I saw early on. Food being placed on the snake was the first one, and the snake turning its head 180 degrees when two or more arrow keys were pressed within one cycle was the other one. ChatGPT and I had a conversation about this a few days ago, but I didn't implement it right away, because the head was definitely a priority. I felt it was a useful conversation. The code suggestion was close to copy&paste fodder, I only needed to fix the scope in various places and wrap one part in a function.

We discussed approaches, ChatGPT first suggested a flag to detect, whether a keystroke had be registered during a cycle, and block all subsequent ones, something that, as a occasional casual games player would annoy me to no end. The cycles are slow, so the player would be limited to one keystroke every 100ms. Its next suggestion was also weird: A flag signaling if there had been a keystroke already. If set, any further keystroke in the same cycle would be written into a `nextDirection` field, which was executed the next cycle. So, only the last keystroke in a cycle would be registered, and only executed in the next cycle. I couldn't make sense of it, so I suggested a queue that, outside of the cycle, would collect all registered keystrokes, and within the cycle this queue would be worked off 1 per cycle. In its usual chirpiness, ChatGPT found that this was "definitely a viable solution". 

Looking for a sensible maximum length, ChatGPT suggested that "The fastest video game controller button-presser is reportedly a player named 'Halo God,' who can press buttons up to 16 times per second.". Well I managed to turn my well-fed snake into a fancy green staircase with up to 5 keystrokes per 100ms cycle, so maybe Halo God isn't the best benchmark.

<img width="400" alt="Snake doing an owlface" src="https://user-images.githubusercontent.com/486892/232915328-ea7cf3ef-cfc7-40e0-b4d0-20a81b3c7aca.png">

### Excursion: the Hydra (geddit? Snake? Hydra?) of executing one good idea
For every few commits that I wrote about here, there are a few more ideas and conversations with ChatGPT, that I try to get back to at some point, just like the issue with the multiple keystrokes per cycle I mentioned above. Other things are both off-ChatGPT and somewhat off-site; last night I finally set up Github Pages for this project. I mean, this is a simple, clientside browser game, why shouldn't it be hosted somewhere for you to play? I first looked into this at the end of last week, and it really is only a few clicks.

It's funny, I'm building this game with as little "auto-pilot" as possible; working this particular way with this particular conversational AI, which I really can't recommend at all, dear future rockstar developers (plenty examples given above), makes that pretty impossible anyway. Doing it this way allows me to see that on almost every step of the way, there aren't only smaller or larger decisions to make, but there's always that one-other-thing-but-not-now, that turns ticking any item off of a list into adding two new ones. Good thing I'm not getting paid for this 😅.

### [f1343f8](https://github.com/mwillerich/browsersnake/commit/f1343f8) fix splash game over
I admit I've gotten a little tired of running circles around free ChatGPT in order to build this game, and the most recent relatively constant duty to double-check any line of code, fix it, etc.

A few days ago I sat down for a Game Over sequence. I wanted to implement a sequence, so something happens on-screen when eventually there's Game Over music. I came up with the letters being printed on a long-enough snake, but the orientation posed both stylistically and logically an issue. So far the body of the snake carries no orientation data, only the position of the square. As I only need the orientation for the end sequence, I decided to derive it from the position instead of permanently storing it throughout the game. Then the magic happened: ChatGPT understood my convoluted idea right away, and, to my surprise, produced working code! It's not the prettiest, but it isn't making things worse than what they already are.
