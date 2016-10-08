# Famien's version of John Conway's Game of Life

For this game the first concern was deparating the display of the game, and its underlying mechanics. 
To address this I broke the game into a controller, which was in charge of displaying the html <table> which
contained the game, and a boardState 'class' which held its own representation of a game, and could transition
betweenstates. I specified a simple interface (a 2d array of 1's and 0's) which could be used between the two. 

The modules are: 1) controller, which behaves in the way specified above 2) boardState, similarly, and 3) states, which 
 is a helper 'class' for getting various state configurations
 
I used functionals for for loops. 
 
I think the use of a 2d array of 1's and 0's which the display and game engine used was nice in that it was very 
 simple and lightweight.
