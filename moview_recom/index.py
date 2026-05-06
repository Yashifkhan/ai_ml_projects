# import numpy as np

# movies = {
#     "Movie A": [2, 4, 5, 6],
#     "Movie B": [5, 7, 3, 9],
#     "Movie C": [8, 2, 1, 7],
#     "Movie D": [1, 9, 6, 2],
#     "Movie E": [7, 3, 4, 8],
#     "Movie F": [6, 6, 2, 5],
#     "Movie G": [3, 8, 7, 1],
#     "Movie H": [9, 1, 2, 6],
#     "Movie I": [4, 5, 8, 3],
#     "Movie J": [2, 7, 6, 4],
#     "Movie K": [8, 3, 5, 7],
#     "Movie L": [1, 6, 9, 2],
#     "Movie M": [7, 4, 3, 8],
#     "Movie N": [5, 2, 6, 9],
#     "Movie O": [6, 7, 4, 5],
#     "Movie P": [3, 5, 7, 2],
#     "Movie Q": [9, 2, 3, 6],
#     "Movie R": [4, 8, 5, 1],
#     "Movie S": [2, 6, 8, 3],
#     "Movie T": [7, 3, 2, 9],
#     "Movie U": [5, 9, 4, 2],
#     "Movie V": [8, 1, 6, 7],
#     "Movie W": [3, 7, 5, 4],
#     "Movie X": [6, 2, 9, 8],
#     "Movie Y": [4, 8, 3, 5],
#     "Movie Z": [7, 5, 6, 1]
# }

# users = {
#     "User 1": [8, 2, 1, 9],   # Loves Action & SciFi
#     "User 2": [1, 9, 8, 2],   # Loves Comedy & Drama
#     "User 3": [5, 5, 5, 5],   # Balanced taste
#     "User 4": [9, 1, 2, 8],   # Action-heavy
# }

# # print("movies",movies)
# user=users["User 4"]
# # print(user)

# scors={}
# for movie,features  in movies.items():
#     scor=np.dot(user,features)  
#     # print(scor)
#     scors[movie]=int(scor)
    
# sorted_movies=sorted(scors.items(), key=lambda x:x[1] , reverse=True)
# # print(sorted_movies[:10])
# for movie, score in sorted_movies[:10]:
#     print(f"{movie} → {score}")



# start the projectof move recomendation system 
import numpy as np 
import pandas as pd

df_credits=pd.read_csv("credits.csv")
df_movies=pd.read_csv("movies.csv")

# print(df_credits.head())

pd.set_option('display.max_columns', None)

# Show all rows
pd.set_option('display.max_rows', None)

# Optional: widen display so columns don’t wrap
pd.set_option('display.width', 1000)

print(df_movies.head(10))