// Basisklasse für Formelemente
class FormElement {
    constructor(type, size) {
        this.type = type;
        this.size = size; // Größe des Elements
        this.orientation = 'mx-auto block'; // Standardausrichtung
        this.preview = null; // Platz für die Vorschau
        this.id = null;
    }

    updatePreview() {
        if (this.preview) {
            this.preview.className = `${this.orientation} space-y-4`; // Fügt vertikale Abstände (spacing) zwischen Elementen hinzu
            const element = this.preview.firstChild;
            element.className = `${this.size} ${this.orientation} mb-4`; // Fügt Abstände zwischen den Elementen in der Vorschau hinzu
        }
    }

    createPreview() {
        // Vorläufige Implementierung, wird in den Unterklassen überschrieben
        return document.createElement('div');
    }
}
// ...

// Unterklasse für Bild
class ImageElement extends FormElement {
    constructor(size) {
        super('image', size);
        this.image = null;
        this.orientation = 'mx-auto block';
        this.imageSize = size;
    }

    createForm() {
        const div = document.createElement('div');
        div.className = 'form-section';

        // Erstelle ein Input-Feld für das Bild
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        div.appendChild(input);

        // Füge einen Event-Listener hinzu, um das Menü zu öffnen
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.image = reader.result;
                this.replaceInputWithElement(div);
            };
            reader.readAsDataURL(file);
        });

        return div;
    }

    replaceInputWithElement(div) {
        const img = document.createElement('img');
        img.src = this.image;
        img.className = this.imageSize; // Setze die Bildgröße
        img.style.float = this.orientation === 'float-left' ? 'left' : this.orientation === 'float-right' ? 'right' : 'none'; // Setze die Ausrichtung
        img.addEventListener('click', () => {
            this.openMenu();
        });
        div.innerHTML = '';
        div.appendChild(img);
    }

    openMenu() {
        const menu = document.createElement('div');
        menu.className = 'menu';
        menu.innerHTML = `
            <h2>Bild-Einstellungen</h2>
            <label for="image-size">Bildgröße:</label>
            <select id="image-size">
                <option value="w-1/4">Klein</option>
                <option value="w-1/2">Mittel</option>
                <option value="w-3/4">Groß</option>
                <option value="w-full">Vollständig</option>
            </select>
            <label for="image-orientation">Ausrichtung:</label>
            <select id="image-orientation">
                <option value="float-left">Links</option>
                <option value="mx-auto block">Zentriert</option>
                <option value="float-right">Rechts</option>
            </select>
            <button id="change-image">Bild ändern</button>
            <button>Speichern</button>
        `;
        document.body.appendChild(menu);
        menu.style.position = 'fixed';
        menu.style.top = '0';
        menu.style.left = '0';
        menu.style.width = '100%';
        menu.style.background = 'white';
        menu.style.padding = '20px';
        menu.style.borderBottom = '1px solid black';

        // Setze die aktuelle Bildgröße und Ausrichtung im Menü
        menu.querySelector('#image-size').value = this.imageSize;
        menu.querySelector('#image-orientation').value = this.orientation;

        // Füge einen Event-Listener hinzu, um die Einstellungen sofort umzusetzen
        menu.querySelector('#image-size').addEventListener('change', (e) => {
            this.imageSize = e.target.value;
            this.updateElement();
        });
        menu.querySelector('#image-orientation').addEventListener('change', (e) => {
            this.orientation = e.target.value;
            this.updateElement();
        });

        // Füge einen Event-Listener hinzu, um das Bild zu ändern
        menu.querySelector('#change-image').addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    this.image = reader.result;
                    this.updateElement();
                };
                reader.readAsDataURL(file);
            });
            input.click();
        });

        // Füge einen Event-Listener hinzu, um die Einstellungen zu speichern
        menu.querySelector('button:last-child').addEventListener('click', () => {
            menu.remove();
        });
    }

    updateElement() {
        const img = document.querySelector('img');
        img.src = this.image;
        img.className = this.imageSize; // Setze die Bildgröße
        if (this.orientation === 'float-left') {
            img.style.float = 'left';
            img.style.margin = '0';
        } else if (this.orientation === 'float-right') {
            img.style.float = 'right';
            img.style.margin = '0';
        } else if (this.orientation === 'mx-auto block') {
            img.style.float = 'none';
            img.style.margin = 'auto';
            img.style.display = 'block';
        }
    }
}

// Unterklasse für Überschrift
class Heading extends FormElement {
    constructor(size) {
        super('heading', size);
        this.text = '';
        this.orientation = 'text-center';
        this.textSize = size;
    }

    createForm() {
        const div = document.createElement('div');
        div.className = 'form-section';

        // Erstelle ein Input-Feld für die Überschrift
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Überschrift eingeben...';
        div.appendChild(input);

        // Füge einen Event-Listener hinzu, um das Menü zu öffnen
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.text = input.value;
                this.replaceInputWithElement(div);
            }
        });

        return div;
    }

    replaceInputWithElement(div) {
        const heading = document.createElement('h2');
        heading.textContent = this.text;
        heading.className = this.textSize; // Setze die Textgröße
        heading.style.textAlign = this.orientation; // Setze die Ausrichtung
        heading.addEventListener('click', () => {
            this.openMenu();
        });
        div.innerHTML = '';
        div.appendChild(heading);
    }

    openMenu() {
        const menu = document.createElement('div');
        menu.className = 'menu';
        menu.innerHTML = `
            <h2>Überschrift-Einstellungen</h2>
            <label for="text">Text:</label>
            <input type="text" id="text" value="${this.text}">
            <label for="text-size">Textgröße:</label>
            <select id="text-size">
                <option value="text-xl">Klein</option>
                <option value="text-3xl">Mittel</option>
                <option value="text-5xl">Groß</option>
                <option value="text-6xl">Sehr Groß</option>
                <option value="text-7xl">Extra Groß</option>
                <option value="text-8xl">Super Groß</option>
            </select>
            <label for="text-orientation">Ausrichtung:</label>
            <select id="text-orientation">
                <option value="left">Links</option>
                <option value="center">Zentriert</option>
                <option value="right">Rechts</option>
            </select>
            <button>Speichern</button>
        `;
        document.body.appendChild(menu);
        menu.style.position = 'fixed';
        menu.style.top = '0';
        menu.style.left = '0';
        menu.style.width = '100%';
        menu.style.background = 'white';
        menu.style.padding = '20px';
        menu.style.borderBottom = '1px solid black';

        // Setze die aktuelle Textgröße und Ausrichtung im Menü
        menu.querySelector('#text-size').value = this.textSize;
        menu.querySelector('#text-orientation').value = this.orientation === 'text-center' ? 'center' : this.orientation === 'text-left' ? 'left' : 'right';

        // Füge einen Event-Listener hinzu, um die Einstellungen sofort umzusetzen
        menu.querySelector('#text').addEventListener('input', (e) => {
            this.text = e.target.value;
            this.updateElement();
        });
        menu.querySelector('#text-size').addEventListener('change', (e) => {
            this.textSize = e.target.value;
            this.updateElement();
        });
        menu.querySelector('#text-orientation').addEventListener('change', (e) => {
            this.orientation = e.target.value === 'center' ? 'text-center' : e.target.value === 'left' ? 'text-left' : 'text-right';
            this.updateElement();
        });

        // Füge einen Event-Listener hinzu, um die Einstellungen zu speichern
        menu.querySelector('button').addEventListener('click', () => {
            menu.remove();
        });
    }

    updateElement() {
        const heading = document.querySelector('h2');
        heading.textContent = this.text;
        heading.className = this.textSize; // Setze die Textgröße
        heading.style.textAlign = this.orientation === 'text-center' ? 'center' : this.orientation === 'text-left' ? 'left' : 'right'; // Setze die Ausrichtung
    }
}

// Unterklasse für Slider
class Slider extends FormElement {
    constructor(size) {
        super('slider', size);
        this.images = [];
        this.orientation = 'mx-auto block';
        this.imageSize = size;
    }

    createForm() {
        const div = document.createElement('div');
        div.className = 'form-section';

        // Erstelle ein Input-Feld für den Slider
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        div.appendChild(input);

        // Füge einen Event-Listener hinzu, um das Menü zu öffnen
        input.addEventListener('change', (e) => {
            const files = e.target.files;
            for (const file of files) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.images.push(reader.result);
                    this.replaceInputWithElement(div);
                };
                reader.readAsDataURL(file);
            }
        });

        return div;
    }

    replaceInputWithElement(div) {
        const slider = document.createElement('div');
        slider.className = 'slider';
        if (this.images.length > 0) {
            const img = document.createElement('img');
            img.src = this.images[0];
            img.className = this.imageSize;
            img.style.float = this.orientation === 'float-left' ? 'left' : this.orientation === 'float-right' ? 'right' : 'none';
            slider.appendChild(img);
            if (this.images.length > 1) {
                const box = document.createElement('div');
                box.style.position = 'absolute';
                box.style.top = '0';
                box.style.left = '50%';
                box.style.width = '50px';
                box.style.height = '50px';
                box.style.background = 'gray';
                box.style.opacity = '0.5';
                slider.appendChild(box);
            }
        }
        slider.addEventListener('click', () => {
            this.openMenu(div);
        });
        div.innerHTML = '';
        div.appendChild(slider);
    }

    openMenu(div) {
        const menu = document.createElement('div');
        menu.className = 'menu';
        menu.innerHTML = `
            <h2>Slider-Einstellungen</h2>
            <div class="images"></div>
            <button class="add-image">+</button>
            <label for="image-size">Bildgröße:</label>
            <select id="image-size">
                <option value="w-1/4">Klein</option>
                <option value="w-1/2">Mittel</option>
                <option value="w-3/4">Groß</option>
                <option value="w-full">Vollständig</option>
            </select>
            <label for="image-orientation">Ausrichtung:</label>
            <select id="image-orientation">
                <option value="float-left">Links</option>
                <option value="mx-auto block">Zentriert</option>
                <option value="float-right">Rechts</option>
            </select>
            <button id="save-button">Speichern</button>
        `;
        const imagesDiv = menu.querySelector('.images');
        for (const image of this.images) {
            const img = document.createElement('img');
            img.src = image;
            img.style.width = '50px';
            img.style.height = '50px';
            img.style.margin = '10px';
            const removeButton = document.createElement('button');
            removeButton.textContent = 'X';
            removeButton.addEventListener('click', () => {
                this.images.splice(this.images.indexOf(image), 1);
                imagesDiv.innerHTML = '';
                for (const image of this.images) {
                    const img = document.createElement('img');
                    img.src = image;
                    img.style.width = '50px';
                    img.style.height = '50px';
                    img.style.margin = '10px';
                    imagesDiv.appendChild(img);
                }
                this.replaceInputWithElement(div);
            });
            imagesDiv.appendChild(img);
            imagesDiv.appendChild(removeButton);
        }
        menu.querySelector('.add-image').addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    this.images.push(reader.result);
                    imagesDiv.innerHTML = '';
                    for (const image of this.images) {
                        const img = document.createElement('img');
                        img.src = image;
                        img.style.width = '50px';
                        img.style.height = '50px';
                        img.style.margin = '10px';
                        imagesDiv.appendChild(img);
                    }
                    this.replaceInputWithElement(div);
                };
                reader.readAsDataURL(file);
            });
            input.click();
        });
        menu.querySelector('#save-button').addEventListener('click', () => {
            this.imageSize = menu.querySelector('#image-size').value;
            this.orientation = menu.querySelector('#image-orientation').value;
            this.replaceInputWithElement(div);
            menu.remove();
        });
        menu.querySelector('#image-size').addEventListener('change', () => {
            this.imageSize = menu.querySelector('#image-size').value;
            this.replaceInputWithElement(div);
        });
        menu.querySelector('#image-orientation').addEventListener('change', () => {
            this.orientation = menu.querySelector('#image-orientation').value;
            this.replaceInputWithElement(div);
        });
        document.body.appendChild(menu);
        menu.style.position = 'fixed';
        menu.style.top = '0';
        menu.style.left = '0';
        menu.style.width = '100%';
        menu.style.background = 'white';
        menu.style.padding = '20px';
        menu.style.borderBottom = '1px solid black';
    }
}

let elementListe = [];

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
    }

    if (element) {
        const form = element.createForm();
        document.getElementById('canvas').appendChild(form);
        elementListe.push(element);
    }
}

// Event-Listener für den "+" Button
document.getElementById('add-element-btn').addEventListener('click', () => {
    const options = document.getElementById('element-options');
    options.classList.toggle('hidden');
});

// Event-Listener für die Elementtypen
document.querySelectorAll('.element-type').forEach(button => {
    button.addEventListener('click', (e) => {
        const type = e.target.getAttribute('data-type');
        addElement(type, 'large');
        document.getElementById('element-options').classList.add('hidden');
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









// Ajax logic for saving data to backend
$(document).ready(function() {
    let autoSaveInterval = 5000;  // alle 5 Sekunden speichern
    let lastSavedContent = '';

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    
    const csrftoken = getCookie('csrftoken');
    const memory_page = $('#memory_page').val()
    console.log(memory_page);
    function autoSave() {
        let currentContent = $('#editor').val();
        console.log("Sending Data to Backend:\n" + JSON.stringify({ memory_page: memory_page, content: elementListe }));

        if (elementListe.length <= 0)return;
        // Nur speichern, wenn sich der Inhalt geändert hat
        if (elementListe !== lastSavedContent) {
            lastSavedContent = elementListe;
            $.ajax({
                url: '/share/save_memory/',
                method: 'POST',
                data: JSON.stringify({ memory_page: memory_page, content: elementListe }),
                contentType: 'application/json',
                headers: { 'X-CSRFToken': csrftoken },
                success: function(response) {
                    $('#status').text('Gespeichert');
                    lastSavedContent = currentContent;
                },
                error: function(xhr, status, error) {
                    $('#status').text('Fehler beim Speichern.');
                }
            });
        }
    }
    

    // Auto-Speichern alle 5 Sekunden starten
    //setInterval(autoSave, autoSaveInterval);
    $(".save").click(function(){
        
        autoSave();
    });

    $(".save_exit").click(function(){
        autoSave();
        window.location.href = $(".save_exit").attr("href");
    });

    // Status zurücksetzen, wenn der Benutzer Änderungen vornimmt
    $('#editor').on('input', function() {
        $('#status').text('Änderungen nicht gespeichert');
    });

    
});




// lade bereits erstellte Elemente

// Funktion, um die Elemente zu erstellen und in den Editor einzufügen
// Lade die JSON-Daten korrekt aus dem Script-Tag
const elementsData = JSON.parse(document.getElementById('elements-data').textContent);
console.log("Elements Data: ", elementsData);

// Jetzt kannst du die Elemente durchgehen und verarbeiten
elementsData.forEach(element => {
    const elementData = element.data; // Zugriff auf das JSON-Feld element_data
    let newElement;

    if (elementData.type === 'heading') {
        newElement = new Heading(elementData.font_size);
        newElement.text = elementData.text;
        newElement.orientation = elementData.orientation;
        newElement.id = element.id;

    } else if (elementData.type === 'image') {
        // Übernehme das erste Bild aus der Images-Liste, falls vorhanden
        //const imageUrl = element.data.image > 0 ? element.images[0].imageUrl : '';
        newElement = new ImageElement(elementData.size, elementData.imageUrl);
        newElement.image = elementData.image;
        newElement.image_id = elementData.image_id;
        newElement.orientation = elementData.orientation;
        newElement.size = elementData.size;
        newElement.id = element.id;

    } else if (elementData.type === 'textimage') {
        const imageUrl = element.images.length > 0 ? element.images[0].imageUrl : '';
        newElement = new TextImage('large', elementData.image_orientation, imageUrl);

        newElement.orientation = elementData.orientation;
        newElement.id = element.id;
        newElement.text = elementData.text;
        newElement.title = elementData.heading;
        newElement.titleSize = elementData.heading_size;
        newElement.textSize = elementData.text_size;
        console.log("TextImage Element: ", newElement);
    } else if (elementData.type === 'slider') {
        newElement = new Slider(elementData.size)
        newElement.images = elementData.images;
        newElement.image_ids = elementData.image_ids;
    }

    console.log("New Element: ", newElement);

    if (newElement) {
        elementListe.push(newElement);
        const form = newElement.createForm();
        const previewElement = newElement.createPreview();

        document.getElementById('dynamic-form-container').appendChild(form);
        document.getElementById('preview-container').appendChild(previewElement);

        // Vorschau für Überschrift aktualisieren
        if (elementData.type === 'heading') {
            newElement.updatePreviewText(elementData.text);
        }
    }
});

