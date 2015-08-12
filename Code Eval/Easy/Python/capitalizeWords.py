import sys
test_cases = open(sys.argv[1], 'r')

for test in test_cases:
    print(" ".join(word[0].upper() + word[1:] for word in test.split()))

test_cases.close()