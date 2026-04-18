import joblib
from fastapi import FastAPI
import numpy as np

app = FastAPI()

# load the model 
model = joblib.load("salary_model.pkl")
scaler = joblib.load("scaler.pkl")


@app.post("/predict")
def predict_salary(
    experience_years,
    js, react, python, node,
    total_skills,
    education_master,
    location_tier2,
    company_size_medium,
    company_size_small,
    exp_level_mid,
    exp_level_senior,
    exp_level_expert
):
    # input in same order as training
    data = np.array([[
        experience_years,
        js, react, python, node,
        total_skills,
        education_master,
        location_tier2,
        company_size_medium,
        company_size_small,
        exp_level_mid,
        exp_level_senior,
        exp_level_expert
    ]])

    # scale
    data_scaled = scaler.transform(data)

    # predict
    prediction = model.predict(data_scaled)

    return prediction[0]

result = predict_salary(
    experience_years=5,
    js=1,
    react=1,
    python=0,
    node=1,
    total_skills=3,
    education_master=0,
    location_tier2=1,
    company_size_medium=0,
    company_size_small=1,
    exp_level_mid=0,
    exp_level_senior=1,
    exp_level_expert=0
)

print("Predicted Salary:", result)