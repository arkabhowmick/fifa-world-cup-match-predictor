# fifa-world-cup-match-predictor

* Execute index.js using `node index.js`
* You will be prompted to enter the score of match in the format. `2-0`.
* For prompts that show `(Can Draw)` you can enter scores like `2-2` for matches that you think can be drawn
* For prompts that show `(Cannot Draw)` you must enter a score that has a winner
* Results will be created in `results` folder. Please create a `results` folder if not available.
* The logic is based on the rank of teams. Team with lower rank will beat the team with higher rank. Currently, the matches between teams with a rank difference of greater than 10 will be predicted by the computer based on the rank, if rank difference is less than 10, user will be prompted to enter the scoreline. You can set the value in `constants.js` file.
* That's it. Enjoy. You're welcome to become a collaborator.
