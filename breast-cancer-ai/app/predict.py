import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image


# MODEL ARCHITECTURES


def get_resnet50():
    model = models.resnet50(weights=None)
    model.fc = nn.Linear(model.fc.in_features, 2)
    return model


def get_densenet121():
    model = models.densenet121(weights=None)
    model.classifier = nn.Linear(model.classifier.in_features, 2)
    return model


def get_mobilenetv2():
    model = models.mobilenet_v2(weights=None)
    model.classifier[1] = nn.Linear(model.classifier[1].in_features, 2)
    return model


def get_efficientnet_b0():
    model = models.efficientnet_b0(weights=None)
    model.classifier[1] = nn.Linear(model.classifier[1].in_features, 2)
    return model



# MODEL CACHE


models_cache = {}

def load_model_by_name(model_name):
    print(f"🔄 Loading model: {model_name}")

    if model_name in models_cache:
        return models_cache[model_name]

    if model_name == "resnet":
        model = get_resnet50()
        model.load_state_dict(torch.load("model/resnet50_best.pth", map_location="cpu"))

    elif model_name == "densenet":
        model = get_densenet121()
        model.load_state_dict(torch.load("model/densenet121_best.pth", map_location="cpu"))

    elif model_name == "mobilenet":
        model = get_mobilenetv2()
        model.load_state_dict(torch.load("model/mobilenetv2_best.pth", map_location="cpu"))

    elif model_name == "efficientnet":
        model = get_efficientnet_b0()
        model.load_state_dict(torch.load("model/efficientnet_b0_best.pth", map_location="cpu"))

    else:
        raise ValueError("Invalid model")

    model.eval()
    models_cache[model_name] = model
    return model



# TRANSFORM


transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])


classes = ["Benign", "Malignant"]



# SINGLE MODEL PREDICTION


def predict_image(image_path, model_name="resnet"):
    print("📸 Starting prediction...")

    model = load_model_by_name(model_name)

    image = Image.open(image_path).convert("RGB")
    image = transform(image).unsqueeze(0)

    with torch.no_grad():
        outputs = model(image)
        probs = torch.softmax(outputs, dim=1)
        confidence, predicted = torch.max(probs, 1)

    return {
        "prediction": classes[predicted.item()],
        "confidence": float(confidence.item()),
        "model": model_name
    }



# ALL MODELS PREDICTION


def predict_all_models(image_path):
    model_list = ["resnet", "densenet", "mobilenet", "efficientnet"]

    results = []

    for model_name in model_list:
        result = predict_image(image_path, model_name)

        results.append({
            "model": model_name,
            "prediction": result["prediction"],
            "confidence": result["confidence"]
        })

    return results

def generate_medical_insight(prediction, confidence):
    if prediction == "Malignant":
        if confidence > 0.95:
            return "High confidence detection of abnormal cell structures consistent with malignant patterns."
        elif confidence > 0.80:
            return "Moderate confidence detection of potentially malignant tissue features."
        else:
            return "Low confidence malignant prediction. Further testing is recommended."
    else:
        if confidence > 0.95:
            return "High confidence detection of normal/benign tissue patterns."
        elif confidence > 0.80:
            return "Moderate confidence benign classification."
        else:
            return "Low confidence benign prediction. Additional validation may be needed."


def confidence_explanation(conf):
    if conf > 0.95:
        return "Very high confidence — prediction is highly reliable."
    elif conf > 0.80:
        return "Moderate confidence — prediction is reasonably reliable."
    else:
        return "Low confidence — prediction should be interpreted with caution."