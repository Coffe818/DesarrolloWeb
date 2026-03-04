from flask import Flask, render_template, request, flash, redirect, url_for

app = Flask(__name__)
app.secret_key = "supersecretkey"


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        nombre_completo = request.form.get("nombre_completo")
        curp = request.form.get("curp")
        nombre = request.form.get("nombre")
        paterno = request.form.get("paterno")
        materno = request.form.get("materno")
        telefono = request.form.get("telefono")
        celular = request.form.get("celular")
        correo = request.form.get("correo")
        nivel = request.form.get("nivel")
        municipio = request.form.get("municipio")
        asunto = request.form.get("asunto")

        if not all(
            [
                nombre_completo,
                curp,
                nombre,
                paterno,
                materno,
                telefono,
                celular,
                correo,
                nivel,
                municipio,
                asunto,
            ]
        ):
            flash("Por favor, completa todos los campos del formulario.", "error")
        elif (
            nivel == "Seleccionar una opcion"
            or municipio == "Seleccionar una opcion"
            or asunto == "Seleccionar una opcion"
        ):
            flash(
                "Por favor, selecciona una opción válida en todos los menús desplegables.",
                "error",
            )
        else:
            flash("¡Turno generado exitosamente!", "success")
            return redirect(url_for("index"))

    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
