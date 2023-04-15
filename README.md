# browsersnake
ChatGPT and I are pair programming on a browser implementation of the game snake.

## Progress log
### [75e006d](https://github.com/mwillerich/browsersnake/commit/75e006d5a40719241457da1b695a3e1f35a41980) first implementation suggestion

We talk about easy-to-implement browser games using HTML, CSS and Javascript. ChatGPT gives me a few options and we settle on snake. Pong would've also been cool, but that's for another day. ChatGPT gives me its first suggestion of what an implementation could look like. 

Right off the bat an issue shows up that keeps on happening: The response is cut off mid-code, and it's down to me to prompt ChatGPT to continue its code. So, in 2 pieces, copy, paste, it works.

### [ab810a2](https://github.com/mwillerich/browsersnake/commit/ab810a25d83fa9420740ee87418ba2255697d290) adding styles, moving css to separate file

I ask for "more pretty" styles, and get this set of CSS, with the suggestion to put it into an external file. I silently deviated from the naming and closed the tag as well. I noticed that the instructions don't actually match the HTML structure, it references a few ids that don't exist. We don't discuss it at this point, though.
