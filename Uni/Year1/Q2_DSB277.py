"""
TM112 21D TMA03 Q2 starter code
TM112 Module Team 17/12/2020
"""

from random import *


def show_flashcard():
    """ 
    This flascard program allows the user to ask for a glossary entry.
    In response, the program randomly picks an entry from all glossary entries.
    It shows the entry and 2 possibly definitions in a random order
    User is then asked to input '1' or '2' depending on what they think is the correct definition.
    After user presses return, they are then informed if they are correct.
    User can repeatedly ask for an entry and also has the option to quit the program
 
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
    
    # displays the two possible definitions for the glossary entry
    # depending on the random order chosen

    print('Here are the two possible definitions')
    if correct_def=='1':
        print('1', glossary[random_key1])
        print('2', glossary[random_key2])
    else:
        print('1', glossary[random_key2])
        print('2', glossary[random_key1])

    # asks the user for their choice
    # and tells them if they are correct
    user_input=input('Which definition is correct? Enter either 1 or 2')

    if user_input==correct_def:
        print('correct')
    else:
        print('incorrect')
    

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
                       
