import pandas as pd 

# load data 
df=pd.read_csv("employee_data_200_rows.csv")

# check the null values 
# print(df.isnull().sum())

# if you want to remove the row is null 
# df = df.dropna() 

# if you want to replace only mean and another value then use  
df["experience_years"].fillna(df["experience_years"].mean(),inplace=True)


# skill column are empty so we replace with empty string 
df["skills"]=df["skills"].fillna("")

# fill the education value with (most frequent value) 
df["education"]=df["education"].fillna(df["education"].mode()[0])

# location fill with rendom values
df["location"]=df["location"].fillna(df["location"].mode()[0])


# if you have on skill in one raw then use simple way 
# df = pd.get_dummies(df, columns=['skills'], drop_first=True)

# so we creae manuly encoding becise we have multy skills in row 
df['js'] = df['skills'].apply(lambda x: 1 if 'js' in x else 0)
df['react'] = df['skills'].apply(lambda x: 1 if 'react' in x else 0)
df['python'] = df['skills'].apply(lambda x: 1 if 'python' in x else 0)
df['node'] = df['skills'].apply(lambda x: 1 if 'node' in x else 0)

# now skills column is remove from there  
df=df.drop("skills",axis=1)
# print(df.isnull().sum())
print(df)