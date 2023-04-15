# browsersnake
ChatGPT and I are pair programming on a browser implementation of the game snake.

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
