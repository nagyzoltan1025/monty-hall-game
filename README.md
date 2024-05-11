# Monty Hall Paradox Game

This small project is a fun, interactive application designed to test and demonstrate the Monty Hall Paradox, which is often counterintuitive. 
In the Monty Hall game, a player is presented with three doors: behind one door is a prize, and behind the others, goats. After the player selects a door, the host, who knows what's behind each door, opens one of the other two doors to reveal a goat. Here, the player faces a choice: stick with the original door or switch to the other unopened door. According to the paradox, switching doors gives a player a 66% chance of winning.

To explore this theory, I developed an app using Angular that allows users to play through multiple rounds, either switching or staying with their initial choice.
It's also possible to run a simulation, where the game itself tries to figure out which strategy is better: to switch or to stay.

**Game Rules:**
* There are 3 doors, one containing a prize, and the other two containing nothing.
* At the start of the game, the player chooses a door.
* The game then opens another door that does not have the prize.
* The player is offered the chance to select another door.
* Once the player selects a door for the second time, it opens, and the game determines whether the player won the prize.
* The game can be played by a human or run as a simulation. In simulation mode, the AI player plays the game and tries to determine which strategy is better: switching or holding. The AI uses the Q-Learning algorithm for this purpose.

Before the simulation starts, the user can configure the following parameters:
* **Learning Rate**: This parameter determines how much new information overrides old information. It ranges from 0 to 1. A higher learning rate means that the learning updates are more substantial, causing the algorithm to adjust more to the most recent information. Conversely, a lower learning rate means that the algorithm relies more heavily on past knowledge, integrating new information more gradually. This balance helps manage the trade-off between exploration (acquiring new knowledge) and exploitation (using existing knowledge).
* **Discount Factor**: Also between 0 and 1, this parameter determines the importance of future rewards. A discount factor of 0 makes the agent short-sighted, considering only current rewards, while a discount factor near 1 makes it far-sighted, considering long-term rewards. This factor is crucial for the convergence of the Q-learning algorithm and helps the agent to value immediate versus future rewards.
* **Simulation Speed**: This controls how fast the AI plays the game. The default speed is 1 action per second.
Please adjust the configurations as needed to suit your strategy or testing preferences.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Checking for lint errors:
Run `ng lint` to execute the lint checks.
