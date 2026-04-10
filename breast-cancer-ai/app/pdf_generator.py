from reportlab.platypus import (
    Image, SimpleDocTemplate, Paragraph, Spacer,
    Table, TableStyle
)
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
import os
import uuid
from datetime import datetime
import matplotlib.pyplot as plt

def generate_chart(results, chart_path):
    models = [r["model"].upper() for r in results]
    confidences = [r["confidence"] * 100 for r in results]

    plt.figure()
    plt.bar(models, confidences)
    plt.xlabel("Models")
    plt.ylabel("Confidence (%)")
    plt.title("Model Confidence Comparison")

    plt.tight_layout()
    plt.savefig(chart_path)
    plt.close()


def generate_pdf(results, insight=None, confidence_note=None, agreement=None, risk=None):
    os.makedirs("reports", exist_ok=True)

    file_name = f"report_{uuid.uuid4().hex}.pdf"
    pdf_path = f"reports/{file_name}"

    doc = SimpleDocTemplate(pdf_path)
    styles = getSampleStyleSheet()

    content = []

    # -------------------------------
    #  TITLE
    
    content.append(Paragraph("Breast Cancer Detection AI Report", styles["Title"]))
    content.append(Spacer(1, 12))

   
    #  DATE
    # -------------------------------
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    content.append(Paragraph(f"Generated on: {now}", styles["Normal"]))
    content.append(Spacer(1, 12))

   
    #  TABLE DATA
  
    table_data = [["Model", "Prediction", "Confidence (%)"]]

    best_model = max(results, key=lambda x: x["confidence"])

    for r in results:
        table_data.append([
            r["model"].upper(),
            r["prediction"],
            f"{r['confidence'] * 100:.2f}%"
        ])

  
    #  TABLE STYLE
   
    table = Table(table_data)

    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 10),
        ("GRID", (0, 0), (-1, -1), 1, colors.black),
    ]))

    content.append(table)
    content.append(Spacer(1, 12))

    # chart_path = "reports/chart.png"
    chart_path = f"reports/chart_{uuid.uuid4().hex}.png"
    generate_chart(results, chart_path)

    content.append(Paragraph("Model Confidence Chart", styles["Heading2"]))
    content.append(Spacer(1, 10))

    content.append(Image(chart_path, width=400, height=200))
    content.append(Spacer(1, 12))
    
    #  BEST MODEL
   
    content.append(Paragraph(
        f"Best Model: {best_model['model'].upper()} "
        f"({best_model['confidence']*100:.2f}%)",
        styles["Heading2"]
    ))
    content.append(Spacer(1, 8))


    #  FINAL DIAGNOSIS
   
    content.append(Paragraph(
        f"Final Prediction: <b>{best_model['prediction']}</b>",
        styles["Heading2"]
    ))
    content.append(Spacer(1, 8))
    
    # content.append(Spacer(1, 15))

    content.append(Paragraph("AI Analysis Summary", styles["Heading2"]))
    content.append(Spacer(1, 10))

    if insight:
        content.append(Paragraph(f"Insight: {insight}", styles["Normal"]))
        content.append(Spacer(1, 8))

    if confidence_note:
        content.append(Paragraph(f"Confidence Interpretation: {confidence_note}", styles["Normal"]))
        content.append(Spacer(1, 8))

    if risk:
        content.append(Paragraph(f"Risk Level: {risk}", styles["Normal"]))
        content.append(Spacer(1, 8))

    if agreement:
        content.append(Paragraph(f"Model Agreement: {agreement}", styles["Normal"]))
        content.append(Spacer(1, 6))
    
    
    
    #  DISCLAIMER

    content.append(Paragraph(
        "Disclaimer: This AI system is for research purposes only and "
        "should not replace professional medical advice.",
        styles["Italic"]
    ))

    # BUILD PDF
    doc.build(content)

    return f"reports/{file_name}"