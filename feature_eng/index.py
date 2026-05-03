import numpay as np
import pandas as pd

df=pd.read_csv("house_prices_advanced_regression.csv")

# print only five column 
# print(df.head())

# print the shape row and column size 
# print(df.shape)

# print the column name only 
# print(df.columns)

# check the data type 
# print(df.info)

# print  the, Mean ,Min / Max ,Std deviation
# print(df.describe())

# check the missing value in data 
# miss_df=df.isnull().sum()


# this column have missing values 
# column_miss_df=miss_df[miss_df > 0]
# print(column_miss_df.sort_values(ascending=True))

# check how many % present data is missing 
# missing_percent = (df.isnull().sum() / len(df)) * 100
# missing_percent = missing_percent[missing_percent > 0]
# print(missing_percent.sort_values(ascending=False))

# remove this column have 80%  of missing value 
# missing_percent = (df.isnull().sum() / len(df)) * 100
# high_missing_values= missing_percent[missing_percent > 80].index
# df.drop(columns=high_missing_values,inplace=True)

# print(df.columns)
# print(df.shape)


# fill the missing value with none , model can undrstand the none value = empty data 

# Handle Categorical Missing Values

    # Example:
        # "Red", "Blue" (Color)
        # "Yes", "No"
        # "Male", "Female" (Gender)

# fill data none  value is missing categorical data            
# cat_df=df.select_dtypes(include="object").columns
# df[cat_df]=df[cat_df].fillna("None")
# print("cat_data",df[cat_df])
        
# Handle Numerical Missing Values 

    # Numbers:
            # Age, Price, Salary, Area   (23,20k,90k,1000)
            
# num_df=df.select_dtypes(include=["int64","float64"]).columns
# print(df[num_df])
# df[num_df]=df[num_df].fillna(df[num_df].median())
# print(df[num_df])
     
     
     
# Fill values using neighborhood mean 
# df["LotFrontage"] = df.groupby("Neighborhood")["LotFrontage"].transform(
    # lambda x: x.fillna(x.median())
# )
# print(df.head())



# finaly clear and filted data  
# # Drop high missing
# high_missing = (df.isnull().sum() / len(df)) * 100
# high_missing = high_missing[high_missing > 80].index
# df.drop(columns=high_missing, inplace=True)

# # Fill categorical
# cat_cols = df.select_dtypes(include="object").columns
# df[cat_cols] = df[cat_cols].fillna("None")

# # Fill numerical
# num_cols = df.select_dtypes(include=["int64", "float64"]).columns
# df[num_cols] = df[num_cols].fillna(df[num_cols].median())


print(df.isnull().sum().sum())
# ans is 0 mins you data is 100 % cleared 


