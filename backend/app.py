import string
import numpy as np
from torch import true_divide
from difflib import SequenceMatcher

def similar(a, b):
    return SequenceMatcher(None, a, b).ratio()

("drug_name.txt",dtype=str,delimiter="|")

def checkInteraction(alreadyAdded, first):
    print("Here from app.py")
    
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
