"""
TM112 21D TMA03 Q2 starter code
TM112 Module Team 17/12/2020
"""

from random import *


def show_flashcard():
    """ 
        ADD YOUR DOCSTRING HERE 
    """

    # Get glossary keys.
    keys = list(glossary)

    # Choose two random glossary keys.
    random_key1 = choice(keys)
    random_key2 = choice(keys)
    # Keep checking random_key2 until
    # it is different from random_key1
    while random_key2 == random_key1:
      random_key2 = choice(keys)  

    # Display random glossary key.
    print('Here is a glossary entry:', random_key1)

    # Choose a random order to display the definitions in
    # '1' means the correct definition
    #  should be printed first.
    #
    # '2' means the correct definition
    # should printed second.
    #
    correct_def = choice(['1', '2'])

    # INSERT YOUR CODE IMMEDIATELY BELOW.
 




# DO NOT CHANGE ANYTHING IN THE NEXT SECTION    

# Set up the glossary

glossary = {'word1':'definition1',
            'word2':'definition2',
            'word3':'definition3'}

# The interactive loop

exit = False
while not exit:
    user_input = input('Enter s to show a flashcard and q to quit: ')
    if user_input == 'q':
        exit = True
    elif user_input == 's':
        show_flashcard()
    else:
        print('You need to enter either q or s.')
                       
