import numpay as np
import pandas as pd

df=pd.read_csv("house_prices_advanced_regression.csv")

# print only five column 
print(df.head())

# print the shape row and column size 
# print(df.shape)

# print the column name only 
# print(df.columns)

# check the data type 
# print(df.info)

# print  the, Mean ,Min / Max ,Std deviation
print(df.describe())