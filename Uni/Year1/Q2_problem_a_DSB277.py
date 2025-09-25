# Problem: Convert list of foot lengths, in inches, to UK shoe size

# Input: List of foot lengths, in inches, floating point number greater than 7.7
foot_lengths=[10.6, 11.0, 11.1, 10.3, 10.5, 10.8]

# Output: list of Uk shoe sizes,
shoe_sizes=[]

for foot_length in foot_lengths:
   shoesize=(foot_length*3)-23
   shoesize=round(shoesize*2)/2
   shoe_sizes=shoe_sizes+[shoesize]

print('The foot lengths (inches)', foot_lengths, 'are the following shoe sizes', shoe_sizes)
    
