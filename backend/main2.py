
import numpy as np
import matplotlib
matplotlib.use('agg')
from sklearn.metrics import f1_score
from sklearn.metrics import recall_score
from sklearn.metrics import precision_score
import matplotlib
from keras.layers.core import Dropout, Activation
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import roc_curve, auc
from sklearn.metrics import precision_recall_curve
from tensorflow.keras import optimizers
from tensorflow.keras.models import Sequential, save_model, load_model, model_from_json
from keras.models import Sequential
from keras.layers import Dense
from keras.utils import np_utils
#-----------------------------------

# file = open('model.json', 'r')
# loaded  = file.read()
# file.close()

# loaded_model = model_from_json(loaded)
# loaded_model.load_weights("model.h5")

# loaded_model.compile(loss='binary_crossentropy', optimizer='sgd', metrics=['accuracy'])
# X=np.loadtxt('m.txt', dtype=float)
# print(X)
# Y=[]
# ae_y_pred_prob = loaded_model.predict(X,batch_size=200,verbose=True)
# print(ae_y_pred_prob)
# print(ae_y_pred_prob[:,1])
# score = loaded_model.evaluate(X, verbose=0)
# print("%s: %.2f%%" % (loaded_model.metrics_names[1], score[1]*100))

first = 'DB00526'
#first = 'DB00945'
second = 'DB00945'
alreadyAdded = {"DB00945", "DB00526", "DB00718"}
#alreadyAdded = {"DB00718"}
#alreadyAdded = {"DB00952"}
drug_fea = np.loadtxt("DS1/IntegratedDS1 copy.txt",dtype=float,delimiter=",")
interaction = np.loadtxt("DS1/drug_drug_matrix copy.csv",dtype=int,delimiter=",")
posFirst = -1
posSecond = []
pos = []
ok = True
drugList =  np.loadtxt("DS1/drug_list.txt",dtype=str,delimiter=" ")
for i in range(0, len(drugList)):
    if drugList[i][1] == first:
        posFirst = i
    if drugList[i][1] in alreadyAdded:
        posSecond.append(i)
print(posFirst, posSecond)

for i in range(0, len(alreadyAdded)):
    # print(posFirst, " -- ",posSecond[i], "--", i)
    if interaction[posFirst][posSecond[i]] != 0:
        ok = False
        pos.append({posSecond[i], posFirst})
    
if ok:
    print("Alright")
else:
    print("Something is not ok")
    for i in range(0, len(pos)):
        print(pos[i])