import pandas as pd 
import numpy as np
from sklearn.model_selection import  train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
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


# creae new column for better otput
# for skills 
df["total_skills"]=df[["js","react","python","node"]].sum(axis=1) 

# for exprience 
df["exp_level"]=pd.cut(df["experience_years"],
                       bins=[-1,2,5,10,20],
                       labels=['junior','mid','senior','expert']
                       )

df = pd.get_dummies(df, columns=['education','location','company_size'], drop_first=True)

df = pd.get_dummies(df, columns=['exp_level'], drop_first=True)

# now skills column is remove from there  
# df=df.drop("skills",axis=1)
# print(df.isnull().sum())



# feature engineering part compelte and start train model  
# Step 1: convert bool → int FIRST
bool_cols = df.select_dtypes(include='bool').columns
df[bool_cols] = df[bool_cols].astype(int)

# Step 2: then split X and y
X = df.drop(["skills", "salary"], axis=1)
y = df["salary"]

X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=0.2)

scaler=StandardScaler()
X_train=scaler.fit_transform(X_train)
X_test=scaler.transform(X_test)

# print("X_train",X_train)
# print("y_test",y_test)
# print(X_train.shape)

# finaly train model 
model=LinearRegression()

model.fit(X_train,y_train)

# print(df)


y_pred = model.predict(X_test)
# sample = np.array([[5, 1, 1, 0, 1, 3, 0, 1, 0, 1, 0, 1, 0]])
sample_df = pd.DataFrame([{
    'experience_years': 5,
    'js': 1,
    'react': 1,
    'python': 0,
    'node': 1,
    'total_skills': 3,
    'education_master': 0,
    'location_tier2': 1,
    'company_size_medium': 0,
    'company_size_small': 1,
    'exp_level_mid': 0,
    'exp_level_senior': 1,
    'exp_level_expert': 0
}])

prediction = model.predict(scaler.transform(sample_df))

print("predict salary : ",prediction[0])


# print(X_train.head())
# print(df)