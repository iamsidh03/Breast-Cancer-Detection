from fastapi import FastAPI, File, UploadFile
import shutil
import os

from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.predict import (
    predict_image,
    predict_all_models,
    generate_medical_insight,
    confidence_explanation
)

from app.validator import (
    validate_file,
    check_image_quality,
    check_histopathology_pattern
)

from app.pdf_generator import generate_pdf


app = FastAPI()

#  Serve PDF files
app.mount("/reports", StaticFiles(directory="reports"), name="reports")

#  CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



#  HOME

@app.get("/")
def home():
    return {"message": "Breast Cancer AI API Running 🚀"}



#  MAIN API
#
@app.post("/predict")
async def predict(file: UploadFile = File(...), model: str = "default"):
    print(" API HIT")

    file_path = f"temp_{file.filename}"

    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print(" File saved")

    
    #  VALIDATION PIPELINE
   
    is_valid, msg = validate_file(file_path)
    if not is_valid:
        os.remove(file_path)
        return {"error": msg}

    is_valid, msg = check_image_quality(file_path)
    if not is_valid:
        os.remove(file_path)
        return {"error": msg}

    is_valid, msg = check_histopathology_pattern(file_path)
    if not is_valid:
        os.remove(file_path)
        return {"error": msg}

    
    # DEFAULT MODE
    
    if model == "default":
        print(" Using default (ResNet)")

        result = predict_image(file_path, "resnet")

        #  Add explanation
        insight = generate_medical_insight(
            result["prediction"],
            result["confidence"]
        )

        confidence_note = confidence_explanation(result["confidence"])

        os.remove(file_path)

        return {
            "mode": "default",
            "prediction": result["prediction"],
            "confidence": result["confidence"],
            "model": "resnet",
            "insight": insight,
            "confidence_note": confidence_note
        }

    # 
    #  ADVANCED MODE (ALL MODELS)
    #
    elif model == "advanced":
        print("Running ALL models")

        results = predict_all_models(file_path)

        #  Best model
        best_model = max(results, key=lambda x: x["confidence"])

        #  Agreement
        agreement = {}
        for r in results:
            agreement[r["prediction"]] = agreement.get(r["prediction"], 0) + 1

        #  Risk Level
        if best_model["prediction"] == "Malignant":
            if best_model["confidence"] > 0.9:
                risk = "High"
            elif best_model["confidence"] > 0.75:
                risk = "Medium"
            else:
                risk = "Low"
        else:
            risk = "Low"

        #  AI Insight
        insight = generate_medical_insight(
            best_model["prediction"],
            best_model["confidence"]
        )

        confidence_note = confidence_explanation(best_model["confidence"])

        #  Generate PDF
        pdf_path = generate_pdf(
            results,
            insight=insight,
            confidence_note=confidence_note,
            agreement=agreement,
            risk=risk
        )

        os.remove(file_path)
        BASE_URL = "https://breast-cancer-detection-shqf.onrender.com" or "http://127.0.0.1:8000"
    
        return {
            "mode": "advanced",
            "results": results,
            "best_model": best_model["model"],
            "final_prediction": best_model["prediction"],
            "confidence": best_model["confidence"],
            "agreement": agreement,
            "risk_level": risk,
            "insight": insight,
            "confidence_note": confidence_note,
            "pdf": f"{BASE_URL}/{pdf_path}"
        }

   
    #  SPECIFIC MODEL
  
    else:
        print(f" Using model: {model}")

        result = predict_image(file_path, model)

        insight = generate_medical_insight(
            result["prediction"],
            result["confidence"]
        )

        confidence_note = confidence_explanation(result["confidence"])

        os.remove(file_path)

        return {
            "mode": "custom",
            "prediction": result["prediction"],
            "confidence": result["confidence"],
            "model": model,
            "insight": insight,
            "confidence_note": confidence_note
        }