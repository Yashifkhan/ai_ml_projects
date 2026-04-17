import pandas as pd 

# load data 
df=pd.read_csv("employee_data_200_rows.csv")

# check the null values 
# print(df.isnull().sum())

# if you want to remove the row is null 
# df = df.dropna() 

# if you want to replace only mean and another value then use  
df["experience_years"].fillna(df["experience_years"].mean(),inplace=True)

print(df.isnull().sum())
print(df)