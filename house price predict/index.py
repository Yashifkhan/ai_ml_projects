import numpy as np
import pandas as pd

df=pd.read_csv("Housing.csv")
# print(df.head())

# remove the test data column that is not helpfull 
df=df.drop("Address",axis=1)
# print(df.head())

# check the missin value 
df=df.isnull().sum()
print(df)