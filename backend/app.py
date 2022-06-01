import string
import numpy as np
from torch import true_divide
from difflib import SequenceMatcher

def similar(a, b):
    return SequenceMatcher(None, a, b).ratio()

# #find missing drugs
# drugNames = np.loadtxt("drug_name.txt",dtype=str,delimiter="|")
# drugList =  np.loadtxt("drug_list.txt",dtype=str,delimiter=" ")
# for i in range(0, len(drugList)):
#     ok = False
#     for j in range(0, len(drugNames)):
#         if drugList[i][1] == drugNames[j][0]:
#             ok = True
#     if ok == False:
#         print(drugList[i])
# first = 'Vitamina B12'
# # print(similar(first, 'Vitamin B12'))
# # print(similar('Benzylpenicillin', 'Benzilpenicillina'))
# # alreadyAdded = ["DB00945", "DB00526", "DB00718"]
# alreadyAdded = ["Fluconazole", "Benzaclin"]
# drugNames = np.loadtxt("drug_name.txt",dtype=str,delimiter="|")

# posAlreadyAdded = []
# index = ''
# for i in range(0, len(drugNames)):
#     # if first in drugNames[i][1]:
#     names = drugNames[i][1].split(',')
#     for j in range(0, len(names)):
#        # print(names[j])
#         if similar(first,names[j]) > 0.90:
#             index = drugNames[i][0]
# for i in range(0, len(alreadyAdded)):
#     for j in range(0, len(drugNames)):
#         if alreadyAdded[i] in drugNames[j][1]:
#             posAlreadyAdded.append(drugNames[j][0])
# print(index)
# print(posAlreadyAdded)
def checkInteraction(alreadyAdded, first):
    print("Here from app.py")
    
    # first = 'DB00526'
    # #first = 'DB00945'
    # second = 'DB00945'
    # first = 'Vitamina B12'
    # alreadyAdded = {"DB00945", "DB00526", "DB00718"}
    # # #alreadyAdded = {"DB00718"}
    # # #alreadyAdded = {"DB00952"}

   # first = 'Vitamina B12'
    # print(similar(first, 'Vitamin B12'))
    # print(similar('Benzylpenicillin', 'Benzilpenicillina'))
    # alreadyAdded = ["DB00945", "DB00526", "DB00718"]
  #  alreadyAdded = ["Fluconazole", "Benzaclin"]
    drugNames = np.loadtxt("drug_name.txt",dtype=str,delimiter="|")

    posAlreadyAdded = []
    index = ''
    for i in range(0, len(drugNames)):
        # if first in drugNames[i][1]:
        names = drugNames[i][1].split(',')
        for j in range(0, len(names)):
        #print(names[j])
            if similar(first,names[j]) > 0.90:
                index = drugNames[i][0]
    for i in range(0, len(alreadyAdded)):
        for j in range(0, len(drugNames)):
            names = drugNames[j][1].split(',')
            for x in range(0, len(names)):
            #print(names[j])
                if similar(alreadyAdded[i], names[x]) > 0.90:
                    posAlreadyAdded.append(drugNames[j][0])

    if index == '' or posAlreadyAdded == []:
        print ('Unknown')
        return 'OK'
   # drug_fea = np.loadtxt("IntegratedDS1.txt",dtype=float,delimiter=",")
    interaction = np.loadtxt("drug_drug_matrix copy.csv",dtype=int,delimiter=",")
    posFirst = -1
    posSecond = []
    posSecondPos = []
    pos = []
    ok = True
    drugList =  np.loadtxt("drug_list.txt",dtype=str,delimiter=" ")
    for i in range(0, len(drugList)):
        if drugList[i][1] == index:
            posFirst = i 
        for j in range(0, len(posAlreadyAdded)):
            if drugList[i][1] == posAlreadyAdded[j]:
                posSecond.append((i, drugList[i][1]))
    print(posFirst)
    print(posSecond)

    for i in range(0, len(alreadyAdded)):
        print(posFirst, " -- ",posSecond[i][0], "--", i)
        print(interaction[posFirst])
        if interaction[posFirst][posSecond[i][0]] != 0:
            ok = False
            pos.append((posSecond[i][1]))
    
    if ok:
        return "OK"
        print("OK")
    else:
        aux = []
        print("pos", pos)
        for i in range(0, len(pos)):
            aux.append(pos[i])

        print(aux)
        print("NOT OK")
        return "NOT OK"

# # first = 'Vitamina B12'
# first='Doxycycline'
# # first = "Fluconazole"

# alreadyAdded = ["Isotretinoin"]
# # alreadyAdded = ["Fluconazole"]
# checkInteraction(alreadyAdded=alreadyAdded, first=first)