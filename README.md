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

Back to Browser Snake. If ChatGPT keeps forgetting what our project currently looks like, then I should tell it where I am right now, so we can continue from that stage. It tells me how I should mark up code, but in the chat interface it doesn't actually interpret my markup, a lot of triple backticks are being exchanged unparsed. But I notice that it does understand me correctly, I give up and we move on.

