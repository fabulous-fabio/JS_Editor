// Basisklasse für Formelemente
// Basisklasse für Formelemente
// Basisklasse für Formelemente
class FormElement {
    constructor(type, size) {
        this.type = type;
        this.size = size; // Größe des Elements
        this.alignment = 'text-center'; // Standardausrichtung
        this.preview = null; // Platz für die Vorschau
    }

    createSizeAlignmentMenu(container) {
        const menu = document.createElement('div');
        menu.className = 'flex items-center space-x-2 mt-2';

        // Größe auswählen
        const sizeSelect = document.createElement('select');
        sizeSelect.className = 'border p-2 rounded';
        sizeSelect.innerHTML = `
            <option value="w-1/4">Klein</option>
            <option value="w-1/2">Mittel</option>
            <option value="w-3/4">Groß</option>
            <option value="w-full">Vollständig</option>
        `;
        sizeSelect.value = this.size; // Setze die aktuelle Größe
        sizeSelect.onchange = (e) => {
            this.size = e.target.value;
            this.updatePreview();
        };
        menu.appendChild(sizeSelect);

        // Ausrichtung auswählen
        const alignmentSelect = document.createElement('select');
    alignmentSelect.className = 'border p-2 rounded';
    alignmentSelect.innerHTML = `
        <option value="float-left">Links (float)</option>
        <option value="mx-auto block">Zentriert (block)</option>
        <option value="float-right">Rechts (float)</option>
        <option value="object-contain">Skalieren: enthalten (contain)</option>
        <option value="object-cover">Skalieren: abdecken (cover)</option>
        <option value="object-fill">Skalieren: füllen (fill)</option>
        <option value="object-scale-down">Skalieren: herunterskalieren (scale-down)</option>
    `;
        alignmentSelect.value = this.alignment; // Setze die aktuelle Ausrichtung
        alignmentSelect.onchange = (e) => {
            this.alignment = e.target.value;
            this.updatePreview();
        };
        menu.appendChild(alignmentSelect);

        container.appendChild(menu);
    }

    updatePreview() {
        if (this.preview) {
            this.preview.className = this.alignment; // Setze die Ausrichtung auf das Vorschau-Element
            const element = this.preview.firstChild;
            element.className = `${this.size} ${this.alignment}`; // Setze die Größe und Ausrichtung
        }
    }

    createPreview() {
        // Vorläufige Implementierung, wird in den Unterklassen überschrieben
        return document.createElement('div');
    }

    // ... (andere Methoden)
}



// Unterklasse für Überschrift
// Unterklasse für Überschrift
// Unterklasse für Überschrift
class Heading extends FormElement {
    constructor(size) {
        super('heading', size);
    }

    createForm() {
        const div = document.createElement('div');
        div.className = `form-section flex items-center space-x-2 border p-2 rounded-md bg-white shadow-md ${this.size}`;
        div.draggable = true; // Ermögliche Drag-and-Drop

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Überschrift eingeben...';
        input.className = 'w-full p-2 border rounded';
        div.appendChild(input);

        // Löschen Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Löschen';
        deleteButton.className = 'bg-red-500 text-white px-2 rounded';
        deleteButton.onclick = () => {
            div.remove(); // Entferne das Element aus dem Formular
            this.preview.remove(); // Entferne die Vorschau
        };
        div.appendChild(deleteButton);

        // Synchronisiere Textänderungen
        input.addEventListener('input', () => {
            this.updatePreviewText(input.value);
        });

        // Erstelle das Menü für Größe und Ausrichtung
        this.createSizeAlignmentMenu(div);

        return div;
    }

    createSizeAlignmentMenu(container) {
        const menu = document.createElement('div');
        menu.className = 'flex items-center space-x-2 mt-2';
    
        // Größe auswählen
        const sizeSelect = document.createElement('select');
        sizeSelect.className = 'border p-2 rounded';
        sizeSelect.innerHTML = `
            <option value="text-xl font-semibold"> 1 (Klein)</option>
<option value="text-3xl font-semibold"> 2 (Mittel)</option>
<option value="text-5xl font-semibold"> 3 (Groß)</option>
<option value="text-6xl font-semibold"> 4 (Sehr Groß)</option>
<option value="text-7xl font-semibold"> 5 (Extra Groß)</option>
<option value="text-8xl font-semibold"> 6 (Super Groß)</option>

                    `;
        sizeSelect.value = this.size; // Setze die aktuelle Größe
        sizeSelect.onchange = (e) => {
            this.size = e.target.value;
            this.updatePreview();
        };
        menu.appendChild(sizeSelect);
    
        // Ausrichtung auswählen
        const alignmentSelect = document.createElement('select');
        alignmentSelect.className = 'border p-2 rounded';
        alignmentSelect.innerHTML = `
            <option value="text-left">Links</option>
            <option value="text-center">Zentriert</option>
            <option value="text-right">Rechts</option>
        `;
        alignmentSelect.value = this.alignment; // Setze die aktuelle Ausrichtung
        alignmentSelect.onchange = (e) => {
            this.alignment = e.target.value;
            this.updatePreview();
        };
        menu.appendChild(alignmentSelect);
    
        container.appendChild(menu);
    }
    

    createPreview() {
        const div = document.createElement('div');
        div.className = `${this.alignment}`; // Ausrichtung anwenden
        const heading = document.createElement('h2');
        heading.className = `${this.size}`; // Größe anwenden
        div.appendChild(heading);
        this.preview = div; // Speichere die Vorschau
        return div;
    }

    updatePreviewText(text) {
        this.preview.querySelector('h2').textContent = text; // Aktualisiere den Vorschautext
    }
}



// Unterklasse für Bild
// Unterklasse für Bild
// Unterklasse für Bild
class ImageElement extends FormElement {
    constructor(size) {
        super('image', size);
    }

    createForm() {
        const div = document.createElement('div');
        div.className = `form-section flex items-center space-x-2 border p-2 rounded-md bg-white shadow-md ${this.size}`;
        div.draggable = true; // Ermögliche Drag-and-Drop

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.className = 'w-full p-2 border rounded';
        div.appendChild(input);

        // Löschen Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Löschen';
        deleteButton.className = 'bg-red-500 text-white px-2 rounded';
        deleteButton.onclick = () => {
            div.remove(); // Entferne das Element aus dem Formular
            this.preview.remove(); // Entferne die Vorschau
        };
        div.appendChild(deleteButton);

        // Synchronisiere Bildänderungen
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = this.preview.querySelector('img');
                    img.src = event.target.result; // Setze die Bildquelle
                    img.className = `${this.size} h-auto`; // Setze die Bildgröße
                };
                reader.readAsDataURL(file);
            }
        });

        // Erstelle das Menü für Größe und Ausrichtung
        this.createSizeAlignmentMenu(div);

        return div;
    }

    createPreview() {
        const div = document.createElement('div');
        div.className = this.alignment; // Setze die Ausrichtung
        const img = document.createElement('img');
        img.className = `${this.size} h-auto`; // Standardgröße
        div.appendChild(img);
        this.preview = div; // Speichere die Vorschau
        return div;
    }
}


// Unterklasse für Slider
// Unterklasse für Slider
// Unterklasse für Slider
class Slider extends FormElement {
    constructor(size) {
        super('slider', size);
    }

    createForm() {
        const div = document.createElement('div');
        div.className = `form-section flex items-center space-x-2 border p-2 rounded-md bg-white shadow-md ${this.size}`;
        div.draggable = true; // Ermögliche Drag-and-Drop

        const label = document.createElement('label');
        label.textContent = 'Füge Bilder für den Slider hinzu:';
        div.appendChild(label);

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.className = 'w-full p-2 border rounded';
        div.appendChild(input);

        // Löschen Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Löschen';
        deleteButton.className = 'bg-red-500 text-white px-2 rounded';
        deleteButton.onclick = () => {
            div.remove(); // Entferne das Element aus dem Formular
            this.preview.remove(); // Entferne die Vorschau
        };
        div.appendChild(deleteButton);

        // Synchronisiere Slider-Bilder
        input.addEventListener('change', (e) => {
            const files = e.target.files;
            const sliderContainer = this.preview.querySelector('.slider-container');
            sliderContainer.innerHTML = ''; // Leere vorherige Bilder
            for (const file of files) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = document.createElement('img');
                    img.src = event.target.result; // Setze die Bildquelle
                    img.className = `w-full h-auto ${this.size}`; // Setze die Bildgröße
                    sliderContainer.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        });

        // Erstelle das Menü für Größe und Ausrichtung
        this.createSizeAlignmentMenu(div);

        return div;
    }

    createPreview() {
        const div = document.createElement('div');
        div.className = this.alignment; // Setze die Ausrichtung
        const sliderContainer = document.createElement('div');
        sliderContainer.className = `slider-container ${this.size}`; // Container für die Bilder
        div.appendChild(sliderContainer);
        this.preview = div; // Speichere die Vorschau
        return div;
    }
}



// Funktion zum Hinzufügen eines Elements
function addElement(type, size) {
    let element;
    switch (type) {
        case 'heading':
            element = new Heading(size);
            break;
        case 'image':
            element = new ImageElement(size);
            break;
        case 'slider':
            element = new Slider(size);
            break;
        // Hier können weitere Elementtypen hinzugefügt werden
    }

    if (element) {
        const form = element.createForm();
        const previewElement = element.createPreview();


        document.getElementById('dynamic-form-container').appendChild(form);
        document.getElementById('preview-container').appendChild(previewElement);
    }
}



// Synchronisiere Formular und Vorschau
function synchronizeFormAndPreview(formElement) {
    const input = formElement.form.querySelector('input[type="text"]');
    if (input) {
        formElement.updatePreviewText(input.value);
    }

    const imageInput = formElement.form.querySelector('input[type="file"]:not([multiple])');
    if (imageInput) {
        const img = formElement.preview.querySelector('img');
        if (img) {
            img.src = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : ''; // Setze die Bildquelle
        }
    }

    const sliderInput = formElement.form.querySelector('input[type="file"][multiple]');
    if (sliderInput) {
        const sliderContainer = formElement.preview.querySelector('.slider-container');
        sliderContainer.innerHTML = ''; // Leere vorherige Bilder
        for (const file of sliderInput.files) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = document.createElement('img');
                img.src = event.target.result;
                img.className = `w-full h-auto readonly-text ${formElement.size}`; // Stil für das Bild
                sliderContainer.appendChild(img);
            }
            reader.readAsDataURL(file);
        }
    }
}

// Event-Listener für den "+" Button
document.getElementById('add-element-btn').addEventListener('click', () => {
    const options = document.getElementById('element-options');
    options.classList.toggle('hidden'); // Zeige oder verstecke die Optionen
});

// Event-Listener für die Elementtypen
document.querySelectorAll('.element-type').forEach(button => {
    button.addEventListener('click', (e) => {
        const type = e.target.getAttribute('data-type');
        addElement(type, 'text-base'); // Standardgröße 'text-base'
        document.getElementById('element-options').classList.add('hidden'); // Verstecke die Optionen nach Auswahl
    });
});

// Event-Listener für Drag and Drop (optional, kann angepasst werden)
const dynamicFormContainer = document.getElementById('dynamic-form-container');
const previewContainer = document.getElementById('preview-container');

dynamicFormContainer.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('form-section')) {
        e.dataTransfer.setData('text/plain', e.target.outerHTML);
        e.target.classList.add('dragging');
    }
});

dynamicFormContainer.addEventListener('dragover', (e) => {
    e.preventDefault(); // Erlaube das Drop-Event
});

dynamicFormContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const draggedElementHTML = e.dataTransfer.getData('text/plain');
    const newElement = document.createElement('div');
    newElement.innerHTML = draggedElementHTML;
    dynamicFormContainer.appendChild(newElement);
});
