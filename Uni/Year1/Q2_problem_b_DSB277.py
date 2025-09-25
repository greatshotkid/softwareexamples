# Problem: Find worst discrepancy when comparing acuual shoe length with target shoe length

# Input: List of actual shoe lengths, in inches, positive floating point number 
actual_lengths=[11.0,10.9,11.1,11.3,11.5,11.2]

# Input : Target length, in inches, positive floating point number
TARGET_LENGTH=10.7

# Output: maximum difference
differences=[]
maximum=0
for actual_length in actual_lengths:
    difference=(TARGET_LENGTH)-(actual_length)
    difference=round(difference,1)
    if difference<0:
        difference=difference*-1
        differences=differences+[difference]
    else:
       differences=differences+[difference]

for difference in differences:
    if difference>maximum:
        maximum=difference


print('The worst discrepancy is:', maximum)
