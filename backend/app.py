import numpy as np

def checkInteraction(alreadyAdded, first):
    print("Here from app.py")
    
    # first = 'DB00526'
    # #first = 'DB00945'
    # second = 'DB00945'
    alreadyAdded = {"DB00945", "DB00526", "DB00718"}
    # #alreadyAdded = {"DB00718"}
    # #alreadyAdded = {"DB00952"}
    drug_fea = np.loadtxt("IntegratedDS1.txt",dtype=float,delimiter=",")
    interaction = np.loadtxt("drug_drug_matrix copy.csv",dtype=int,delimiter=",")
    posFirst = -1
    posSecond = []
    posSecondPos = []
    pos = []
    ok = True
    drugList =  np.loadtxt("drug_list.txt",dtype=str,delimiter=" ")
    for i in range(0, len(drugList)):
        if drugList[i][1] == first:
            posFirst = i
        if drugList[i][1] in alreadyAdded:
            posSecond.append((i, drugList[i][1]))
    print(posFirst)
    print(posSecond)

    for i in range(0, len(alreadyAdded)):
        # print(posFirst, " -- ",posSecond[i], "--", i)
        if interaction[posFirst][posSecond[i][0]] != 0:
            ok = False
            pos.append((posSecond[i][1]))
    
    if ok:
        return "OK"
    else:
        aux = []
        print("pos", pos)
        for i in range(0, len(pos)):
            aux.append(pos[i])

        print(aux)
        return "NOT OK"
