# MontyHallGame

This is a small, fun project for playing the Monty Hall game.
Many people, myself included, find the Monty Hall Paradox very counterintuitive. This paradox suggests that a player has a 66% chance of winning if they choose to switch doors after the host reveals a goat behind one of the other two doors, rather than sticking with their initial choice. To put this theory to the test and provide a practical demonstration, I created this app. It allows users to experiment with both strategies—switching or holding—over multiple rounds, thereby offering insights into whether the theoretical 66% win rate for switching holds true in practice.

**Game Rules:**
* There are 3 doors, one of which contains a prize, and the other two contain nothing.
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
